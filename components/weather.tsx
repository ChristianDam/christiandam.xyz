'use client';

import { useEffect, useState } from 'react';
import { 
  Cloud, 
  CloudSunny, 
  Fog, 
  HeavyRain, 
  Rain, 
  Snow, 
  SnowFlake, 
  SunLight, 
  Thunderstorm 
} from 'iconoir-react';
import type { WeatherData } from '@/lib/types/api';
import { Muted } from '@/components/ui/typography';

interface WeatherState {
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
}

// Map OpenWeatherMap conditions to Iconoir icons
function getWeatherIcon(condition: string) {
  const conditionLower = condition.toLowerCase();

  // Map main weather conditions to appropriate icons
  if (conditionLower.includes('clear')) {
    return <SunLight className="h-8 w-8" />;
  }
  if (conditionLower.includes('cloud')) {
    // Use cloud-sunny for partly cloudy, otherwise just cloud
    if (conditionLower.includes('few') || conditionLower.includes('scattered')) {
      return <CloudSunny className="h-8 w-8" />;
    }
    return <Cloud className="h-8 w-8" />;
  }
  if (conditionLower.includes('rain') || conditionLower.includes('drizzle')) {
    // Use heavy rain for intense rain
    if (conditionLower.includes('heavy') || conditionLower.includes('extreme')) {
      return <HeavyRain className="h-8 w-8" />;
    }
    return <Rain className="h-8 w-8" />;
  }
  if (conditionLower.includes('thunder') || conditionLower.includes('storm')) {
    return <Thunderstorm className="h-8 w-8" />;
  }
  if (conditionLower.includes('snow')) {
    // Use snowflake for light snow, snow for heavier
    if (conditionLower.includes('light')) {
      return <SnowFlake className="h-8 w-8" />;
    }
    return <Snow className="h-8 w-8" />;
  }
  if (conditionLower.includes('mist') || conditionLower.includes('fog') || conditionLower.includes('haze')) {
    return <Fog className="h-8 w-8" />;
  }
  
  // Default fallback - use cloud-sunny for partial conditions, cloud for others
  return <Cloud className="h-8 w-8" />;
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
      {getWeatherIcon(state.data.condition)}
      <Muted>
        {state.data.temperature}°C · {state.data.condition}
      </Muted>
    </div>
  );
} 