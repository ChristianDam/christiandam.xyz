import { NextResponse } from 'next/server';
import type { PolarExercise, YearlyRunData } from '@/lib/types/polar';

export const revalidate = 3600; // Cache for 1 hour

const POLAR_ACCESS_TOKEN = process.env.POLAR_ACCESS_TOKEN;

const YEARLY_GOAL_KM = 2000;

export async function GET(): Promise<NextResponse<YearlyRunData | { error: string }>> {
  if (!POLAR_ACCESS_TOKEN) {
    return NextResponse.json({ error: 'Polar not configured' }, { status: 500 });
  }

  try {
    const response = await fetch(
      'https://www.polaraccesslink.com/v3/exercises',
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

    const currentYear = new Date().getFullYear();

    // Filter to running exercises from the current year
    const yearlyRunningExercises = exercises.filter((exercise) => {
      const exerciseYear = new Date(exercise.start_time).getFullYear();
      const isRunning =
        exercise.sport === 'RUNNING' ||
        exercise.detailed_sport_info?.toLowerCase().includes('running');
      return isRunning && exerciseYear === currentYear;
    });

    // Calculate total distance
    const totalDistanceMeters = yearlyRunningExercises.reduce(
      (sum, exercise) => sum + exercise.distance,
      0
    );

    const data: YearlyRunData = {
      totalDistanceKm: Math.round(totalDistanceMeters / 1000),
      goalKm: YEARLY_GOAL_KM,
      runCount: yearlyRunningExercises.length,
      year: currentYear,
    };

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching Polar data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}
