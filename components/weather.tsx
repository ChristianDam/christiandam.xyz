'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import type { WeatherData } from '../lib/types/api';

export default function Weather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch('/api/weather');

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to fetch weather data');
        }

        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return <div className="p-4">Loading weather data...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!weather) {
    return null;
  }

  return (
    <div className="p-4 space-y-2">
      <h2 className="text-xl font-bold">Current Weather in Aarhus</h2>
      <div className="grid grid-cols-2 gap-2">
        <div>Temperature:</div>
        <div>{weather.temperature}°C</div>
        <div>Condition:</div>
        <div>{weather.condition}</div>
        <div>Humidity:</div>
        <div>{weather.humidity}%</div>
        <div>Wind Speed:</div>
        <div>{weather.windSpeed} km/h</div>
        <div>Weather Icon:</div>
        <div>
          <Image
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt={weather.condition}
            width={50}
            height={50}
            className="inline-block"
          />
        </div>
      </div>
    </div>
  );
} 