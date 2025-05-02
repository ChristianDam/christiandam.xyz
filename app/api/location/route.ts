import { NextResponse } from 'next/server';
import type { LocationData } from '../../../lib/types/api';

export async function GET(): Promise<NextResponse<LocationData>> {
  try {
    const response = await fetch('http://ip-api.com/json/', {
      headers: {
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      console.error('ip-api.com response not ok:', response.status, response.statusText);
      throw new Error('Failed to fetch location data');
    }

    const data = await response.json();

    // Check if the API returned an error
    if (data.status === 'fail') {
      console.error('ip-api.com returned error:', data.message);
      throw new Error(data.message);
    }

    const locationData: LocationData = {
      latitude: data.lat,
      longitude: data.lon,
      city: data.city,
      country: data.country,
      timezone: data.timezone,
    };

    return NextResponse.json(locationData);
  } catch (error) {
    console.error('Error fetching location:', error);
    
    // Return default data in case of error
    return NextResponse.json({
      latitude: 0,
      longitude: 0,
      city: 'Unknown',
      country: 'Unknown',
      timezone: 'UTC',
    });
  }
} 