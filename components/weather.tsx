'use client';

import { useEffect, useState } from 'react';
import {
  Cloud,
  CloudSunny,
  Fog,
  HalfMoon,
  HeavyRain,
  Rain,
  Snow,
  SnowFlake,
  SunLight,
  Thunderstorm,
} from 'iconoir-react';
import type { WeatherData } from '@/lib/types/api';
import { Muted } from '@/components/ui/typography';
import { Card, CardContent } from '@/components/ui/card';

interface WeatherState {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
}

interface WeatherIconProps {
  condition: string;
  isNight: boolean;
  className?: string;
}

function WeatherIcon({ condition, isNight, className = 'h-8 w-8' }: WeatherIconProps) {
  const conditionLower = condition.toLowerCase();

  if (conditionLower.includes('clear')) {
    return isNight ? <HalfMoon className={className} /> : <SunLight className={className} />;
  }
  if (conditionLower.includes('cloud')) {
    if (conditionLower.includes('few') || conditionLower.includes('scattered')) {
      return <CloudSunny className={className} />;
    }
    return <Cloud className={className} />;
  }
  if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
    if (conditionLower.includes('heavy') || conditionLower.includes('extreme')) {
      return <HeavyRain className={className} />;
    }
    return <Rain className={className} />;
  }
  if (conditionLower.includes('thunder') || conditionLower.includes('storm')) {
    return <Thunderstorm className={className} />;
  }
  if (conditionLower.includes('snow')) {
    if (conditionLower.includes('light')) {
      return <SnowFlake className={className} />;
    }
    return <Snow className={className} />;
  }
  if (
    conditionLower.includes('mist') ||
    conditionLower.includes('fog') ||
    conditionLower.includes('haze')
  ) {
    return <Fog className={className} />;
  }

  return isNight ? <HalfMoon className={className} /> : <Cloud className={className} />;
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

  const { temperature, condition, location, isNight, hourlyForecast } = state.data;

  return (
    <Card className="h-full w-full">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <WeatherIcon condition={condition} isNight={isNight} className="h-10 w-10" />
            <span className="text-4xl font-medium">{temperature}°</span>
          </div>
          <div className="text-right">
            <p className="font-medium">{condition}</p>
            <Muted>{location}</Muted>
          </div>
        </div>

        {hourlyForecast && hourlyForecast.length > 0 && (
          <div className="mt-6 flex justify-between border-t border-border pt-4">
            {hourlyForecast.map((hour) => (
              <div key={hour.time} className="flex flex-col items-center gap-1">
                <Muted className="text-xs">{hour.time}</Muted>
                <WeatherIcon condition={hour.condition} isNight={hour.isNight} className="h-5 w-5" />
                <span className="text-sm">{hour.temperature}°</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
} 