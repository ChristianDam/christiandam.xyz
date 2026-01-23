import { NextResponse } from 'next/server';
import type { PolarExercise, LatestRunData } from '@/lib/types/polar';

export const revalidate = 3600; // Cache for 1 hour

const POLAR_ACCESS_TOKEN = process.env.POLAR_ACCESS_TOKEN;

// Parse GPX XML to extract elevation data
function parseGpxElevations(gpxXml: string): number[] {
  const elevations: number[] = [];
  const eleRegex = /<ele>([\d.]+)<\/ele>/g;
  let match;
  while ((match = eleRegex.exec(gpxXml)) !== null) {
    elevations.push(parseFloat(match[1]));
  }
  return elevations;
}

// Calculate total elevation gain from elevation array
function calculateElevationGain(elevations: number[]): number {
  if (elevations.length < 2) return 0;
  let gain = 0;
  for (let i = 1; i < elevations.length; i++) {
    const diff = elevations[i] - elevations[i - 1];
    if (diff > 0) gain += diff;
  }
  return Math.round(gain);
}

export async function GET(): Promise<NextResponse<LatestRunData | { error: string }>> {
  if (!POLAR_ACCESS_TOKEN) {
    return NextResponse.json({ error: 'Polar not configured' }, { status: 500 });
  }

  try {
    const response = await fetch(
      'https://www.polaraccesslink.com/v3/exercises?route=true',
      {
        headers: {
          Authorization: `Bearer ${POLAR_ACCESS_TOKEN}`,
          Accept: 'application/json',
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Polar API error:', response.status, errorText);
      throw new Error(`Failed to fetch exercises: ${response.status}`);
    }

    const rawResponse = await response.json();
    const exercises: PolarExercise[] = Array.isArray(rawResponse) ? rawResponse : [];

    // Filter to running exercises (road running or trail running)
    const runningExercises = exercises.filter(
      (exercise) =>
        exercise.sport === 'RUNNING' ||
        exercise.detailed_sport_info?.toLowerCase().includes('running')
    );

    if (runningExercises.length === 0) {
      return NextResponse.json({ error: 'No running exercises found' }, { status: 404 });
    }

    const latestExercise = runningExercises[0];

    // Fetch GPX data for elevation
    let elevationGain: number | null = null;

    try {
      const gpxRes = await fetch(
        `https://www.polaraccesslink.com/v3/exercises/${latestExercise.id}/gpx`,
        {
          headers: {
            Authorization: `Bearer ${POLAR_ACCESS_TOKEN}`,
            Accept: 'application/gpx+xml',
          },
        }
      );
      if (gpxRes.ok) {
        const gpxXml = await gpxRes.text();
        const elevations = parseGpxElevations(gpxXml);
        elevationGain = calculateElevationGain(elevations);
      }
    } catch {
      // Ignore GPX fetch errors
    }

    // Parse ISO 8601 duration to total seconds
    const parseDurationToSeconds = (isoDuration: string): number => {
      const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?/);
      if (!match) return 0;
      const hours = match[1] ? parseInt(match[1]) : 0;
      const minutes = match[2] ? parseInt(match[2]) : 0;
      const seconds = match[3] ? parseFloat(match[3]) : 0;
      return hours * 3600 + minutes * 60 + seconds;
    };

    // Format seconds to H:MM:SS or M:SS
    const formatDuration = (totalSeconds: number): string => {
      const h = Math.floor(totalSeconds / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = Math.floor(totalSeconds % 60);
      if (h > 0) {
        return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
      }
      return `${m}:${s.toString().padStart(2, '0')}`;
    };

    // Calculate pace in min/km
    const calculatePace = (durationSeconds: number, distanceMeters: number): string => {
      if (distanceMeters === 0) return '0:00';
      const paceSecondsPerKm = durationSeconds / (distanceMeters / 1000);
      const paceMinutes = Math.floor(paceSecondsPerKm / 60);
      const paceSeconds = Math.floor(paceSecondsPerKm % 60);
      return `${paceMinutes}:${paceSeconds.toString().padStart(2, '0')}`;
    };

    // Determine run type from detailed_sport_info
    const getRunType = (detailedSportInfo: string): 'road' | 'trail' => {
      return detailedSportInfo.toLowerCase().includes('trail') ? 'trail' : 'road';
    };

    const durationSeconds = parseDurationToSeconds(latestExercise.duration);

    const data: LatestRunData = {
      id: latestExercise.id,
      date: latestExercise.start_time,
      duration: formatDuration(durationSeconds),
      distanceKm: Math.round((latestExercise.distance / 1000) * 100) / 100,
      pace: calculatePace(durationSeconds, latestExercise.distance),
      runType: getRunType(latestExercise.detailed_sport_info),
      elevationGain,
      route: latestExercise.route || null,
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching Polar data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
