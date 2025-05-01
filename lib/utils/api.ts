import {
  LocationData,
  WeatherData,
  FootballMatch,
  MusicPlaylist,
  TrainingMetrics,
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
      console.log('Returning cached location data');
      return locationCache;
    }

    console.log('Fetching fresh location data from API');
    const baseUrl = getBaseUrl();
    console.log('Using base URL:', baseUrl);

    const response = await fetch(`${baseUrl}/api/location`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Disable caching to ensure fresh data
    });

    if (!response.ok) {
      console.error('Location API response not ok:', response.status, response.statusText);
      throw new Error(`Failed to fetch location data: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Received location data:', data);
    
    // Validate the data
    if (!data.city || data.city === 'Unknown') {
      console.warn('Received invalid city data:', data);
      throw new Error('Invalid city data received');
    }
    
    // Update cache
    locationCache = data;
    locationCacheTimestamp = now;
    console.log('Updated location cache');
    
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

export async function fetchFootballMatches(): Promise<FootballMatch[]> {
  try {
    const response = await fetch(`${getBaseUrl()}/api/football`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error('Failed to fetch football matches');
    return response.json();
  } catch (error) {
    console.error('Error fetching football matches:', error);
    throw error;
  }
}

export async function fetchMusicPlaylists(): Promise<MusicPlaylist[]> {
  try {
    const response = await fetch(`${getBaseUrl()}/api/music`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error('Failed to fetch music playlists');
    return response.json();
  } catch (error) {
    console.error('Error fetching music playlists:', error);
    throw error;
  }
}

export async function fetchTrainingMetrics(): Promise<TrainingMetrics[]> {
  try {
    const response = await fetch(`${getBaseUrl()}/api/training`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error('Failed to fetch training metrics');
    return response.json();
  } catch (error) {
    console.error('Error fetching training metrics:', error);
    throw error;
  }
} 