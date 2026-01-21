'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import type { WeatherData } from '@/lib/types/api';
import { Muted } from '@/components/ui/typography';

interface WeatherState {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
}

export default function Weather() {
  const [state, setState] = useState<WeatherState>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch('/api/weather');

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch weather data');
        }

        const data: WeatherData = await response.json();
        setState({ data, loading: false, error: null });
      } catch (err) {
        setState({
          data: null,
          loading: false,
          error: err instanceof Error ? err.message : 'An error occurred',
        });
      }
    };

    fetchWeather();
  }, []);

  if (state.loading) {
    return <Muted className="animate-pulse">Loading weather...</Muted>;
  }

  if (state.error || !state.data) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <Image
        src={`https://openweathermap.org/img/wn/${state.data.icon}.png`}
        alt={state.data.condition}
        width={32}
        height={32}
        unoptimized
      />
      <Muted>
        {state.data.temperature}°C · {state.data.condition}
      </Muted>
    </div>
  );
} 