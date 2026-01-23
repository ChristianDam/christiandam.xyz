'use client';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Running } from 'iconoir-react';
import type { LatestRunData, PolarRoutePoint } from '@/lib/types/polar';
import { Muted } from '@/components/ui/typography';
import { Card, CardContent } from '@/components/ui/card';

dayjs.extend(relativeTime);

interface RunState {
  data: LatestRunData | null;
  loading: boolean;
  error: string | null;
}

function formatRelativeDate(dateString: string): string {
  const date = dayjs(dateString);
  const now = dayjs();
  const diffDays = now.diff(date, 'day');

  if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else {
    return date.format(date.year() !== now.year() ? 'MMM D, YYYY' : 'MMM D');
  }
}

interface MiniMapProps {
  route: PolarRoutePoint[];
}

function MiniMap({ route }: MiniMapProps) {
  if (route.length < 2) return null;

  // Calculate bounds without spread operator to avoid stack overflow on large arrays
  let minLat = route[0].latitude;
  let maxLat = route[0].latitude;
  let minLng = route[0].longitude;
  let maxLng = route[0].longitude;

  for (let i = 1; i < route.length; i++) {
    const p = route[i];
    if (p.latitude < minLat) minLat = p.latitude;
    if (p.latitude > maxLat) maxLat = p.latitude;
    if (p.longitude < minLng) minLng = p.longitude;
    if (p.longitude > maxLng) maxLng = p.longitude;
  }

  const latRange = maxLat - minLat || 0.001;
  const lngRange = maxLng - minLng || 0.001;

  // Map coordinates to SVG viewBox (100x80 with padding)
  const mapToSvg = (point: PolarRoutePoint): { x: number; y: number } => {
    const x = ((point.longitude - minLng) / lngRange) * 80 + 10;
    const y = 80 - ((point.latitude - minLat) / latRange) * 60 - 10;
    return { x, y };
  };

  const pathData = route
    .map((point, i) => {
      const { x, y } = mapToSvg(point);
      return i === 0 ? `M ${x},${y}` : `L ${x},${y}`;
    })
    .join(' ');

  // Pre-calculate start and end coordinates
  const startCoords = mapToSvg(route[0]);
  const endCoords = mapToSvg(route[route.length - 1]);

  return (
    <svg
      viewBox="0 0 100 80"
      className="w-full h-20 mt-4"
      role="img"
      aria-label="Running route map with start and end markers"
    >
      <path
        d={pathData}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-foreground"
      />
      {/* Start point */}
      <circle cx={startCoords.x} cy={startCoords.y} r="3" className="fill-green-500" />
      {/* End point */}
      <circle cx={endCoords.x} cy={endCoords.y} r="3" className="fill-red-500" />
    </svg>
  );
}

export default function LatestRun() {
  const [state, setState] = useState<RunState>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchRun = async () => {
      try {
        const response = await fetch('/api/polar');

        if (!response.ok) {
          if (response.status === 404) {
            setState({ data: null, loading: false, error: 'No runs found' });
            return;
          }
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch run data');
        }

        const data: LatestRunData = await response.json();
        setState({ data, loading: false, error: null });
      } catch (err) {
        setState({
          data: null,
          loading: false,
          error: err instanceof Error ? err.message : 'An error occurred',
        });
      }
    };

    fetchRun();
  }, []);

  if (state.loading) {
    return (
      <Card className="h-full w-full bg-muted/50 animate-pulse">
        <CardContent className="p-6">
          <div className="h-24 w-48" />
        </CardContent>
      </Card>
    );
  }

  if (state.error || !state.data) {
    return null;
  }

  const { date, duration, distanceKm, pace, runType, elevationGain, route } = state.data;

  return (
    <Card className="h-full w-full">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Running className="h-10 w-10" />
            <div>
              <span className="text-4xl font-medium">{distanceKm} km</span>
              <Muted className="ml-2 capitalize">{runType}</Muted>
            </div>
          </div>
          <div className="text-right">
            <p className="font-medium">{duration}</p>
            <Muted>{pace} /km</Muted>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-4">
          <Muted>{formatRelativeDate(date)}</Muted>
          {elevationGain !== null && <Muted>+{elevationGain}m</Muted>}
        </div>

        {route && route.length > 0 && <MiniMap route={route} />}
      </CardContent>
    </Card>
  );
}
