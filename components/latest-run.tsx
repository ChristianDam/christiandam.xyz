'use client';

import { useEffect, useState } from 'react';
import { Running } from 'iconoir-react';
import type { YearlyRunData } from '@/lib/types/polar';
import { Muted } from '@/components/ui/typography';
import { Card, CardContent } from '@/components/ui/card';

interface RunState {
  data: YearlyRunData | null;
  loading: boolean;
  error: string | null;
}

export default function YearlyRunTracker() {
  const [state, setState] = useState<RunState>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/polar');

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch run data');
        }

        const data: YearlyRunData = await response.json();
        setState({ data, loading: false, error: null });
      } catch (err) {
        setState({
          data: null,
          loading: false,
          error: err instanceof Error ? err.message : 'An error occurred',
        });
      }
    };

    fetchData();
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

  const { totalDistanceKm, goalKm, runCount, year } = state.data;
  const progressPercent = Math.min((totalDistanceKm / goalKm) * 100, 100);

  return (
    <Card className="h-full w-full">
      <CardContent className="p-6">
        <div className="flex items-center gap-3">
          <Running className="h-10 w-10" />
          <div>
            <span className="text-4xl font-medium">{totalDistanceKm}</span>
            <span className="text-4xl font-medium text-muted-foreground">/{goalKm} km</span>
          </div>
        </div>
        <div className="mt-4">
          <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full bg-foreground transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <Muted>{runCount} runs in {year}</Muted>
          <Muted>{Math.round(progressPercent)}%</Muted>
        </div>
      </CardContent>
    </Card>
  );
}
