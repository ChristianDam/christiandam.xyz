import {
  LocationData,
  WeatherData,
} from '../types/api';

// Cache for location data to prevent too many API calls
let locationCache: LocationData | null = null;
let locationCacheTimestamp: number = 0;
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

const getBaseUrl = () => {
  return process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';
};

export async function fetchLocation(): Promise<LocationData> {
  try {
    // Check if we have cached data that's still valid
    const now = Date.now();
    if (locationCache && now - locationCacheTimestamp < CACHE_DURATION) {
      return locationCache;
    }
    const baseUrl = getBaseUrl();

    const response = await fetch(`${baseUrl}/api/location`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Disable caching to ensure fresh data
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch location data: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    
    // Validate the data
    if (!data.city || data.city === 'Unknown') {
      console.warn('Received invalid city data:', data);
      throw new Error('Invalid city data received');
    }
    
    // Update cache
    locationCache = data;
    locationCacheTimestamp = now;
    
    return data;
  } catch (error) {
    console.error('Error in fetchLocation:', error);
    // Return default data instead of throwing
    return {
      latitude: 0,
      longitude: 0,
      city: 'Unknown',
      country: 'Unknown',
      timezone: 'UTC',
    };
  }
}

export async function fetchWeather(): Promise<WeatherData> {
  try {
    const response = await fetch(`${getBaseUrl()}/api/weather`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error('Failed to fetch weather data');
    return response.json();
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw error;
  }
}
