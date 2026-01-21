import { NextResponse } from 'next/server';
import type { WeatherData, HourlyForecast } from '@/lib/types/api';

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;
const OPENWEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Aarhus, Denmark coordinates
const AARHUS_LAT = 56.1629;
const AARHUS_LON = 10.2039;
const AARHUS_LOCATION = 'Aarhus';

interface OpenWeatherResponse {
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
  dt: number;
}

interface OpenWeatherForecastResponse {
  list: Array<{
    dt: number;
    main: {
      temp: number;
    };
    weather: Array<{
      main: string;
    }>;
  }>;
  city: {
    sunrise: number;
    sunset: number;
  };
}

interface ErrorResponse {
  error: string;
}

function isNightTime(timestamp: number, sunrise: number, sunset: number): boolean {
  return timestamp < sunrise || timestamp > sunset;
}

function formatHour(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    hour12: true,
    timeZone: 'Europe/Copenhagen',
  });
}

export async function GET(): Promise<NextResponse<WeatherData | ErrorResponse>> {
  if (!OPENWEATHER_API_KEY) {
    return NextResponse.json<ErrorResponse>(
      { error: 'OpenWeather API key not configured' },
      { status: 500 }
    );
  }

  try {
    // Fetch current weather and forecast in parallel
    const [currentResponse, forecastResponse] = await Promise.all([
      fetch(
        `${OPENWEATHER_BASE_URL}/weather?lat=${AARHUS_LAT}&lon=${AARHUS_LON}&appid=${OPENWEATHER_API_KEY}&units=metric`
      ),
      fetch(
        `${OPENWEATHER_BASE_URL}/forecast?lat=${AARHUS_LAT}&lon=${AARHUS_LON}&appid=${OPENWEATHER_API_KEY}&units=metric&cnt=6`
      ),
    ]);

    if (!currentResponse.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const currentData = (await currentResponse.json()) as OpenWeatherResponse;
    const isCurrentlyNight = isNightTime(
      currentData.dt,
      currentData.sys.sunrise,
      currentData.sys.sunset
    );

    // Process hourly forecast if available
    let hourlyForecast: HourlyForecast[] | undefined;

    if (forecastResponse.ok) {
      const forecastData = (await forecastResponse.json()) as OpenWeatherForecastResponse;

      hourlyForecast = forecastData.list.map((item) => ({
        time: formatHour(item.dt),
        temperature: Math.round(item.main.temp),
        condition: item.weather[0].main,
        isNight: isNightTime(item.dt, forecastData.city.sunrise, forecastData.city.sunset),
      }));
    }

    const weatherData: WeatherData = {
      temperature: Math.round(currentData.main.temp),
      condition: currentData.weather[0].main,
      humidity: currentData.main.humidity,
      windSpeed: Math.round(currentData.wind.speed * 3.6),
      icon: currentData.weather[0].icon,
      location: AARHUS_LOCATION,
      isNight: isCurrentlyNight,
      hourlyForecast,
    };

    return NextResponse.json<WeatherData>(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return NextResponse.json<ErrorResponse>(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
} 