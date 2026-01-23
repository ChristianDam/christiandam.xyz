export interface PolarExercise {
  id: string;
  sport: string;
  detailed_sport_info: string;
  start_time: string;
  start_time_utc_offset: number;
  duration: string; // ISO 8601 duration, e.g., "PT45M30S"
  distance: number; // meters
  calories: number;
  heart_rate?: {
    average: number;
    maximum: number;
  };
  has_route: boolean;
  route?: PolarRoutePoint[];
}

export interface PolarRoutePoint {
  latitude: number;
  longitude: number;
  time: string;
}

export interface LatestRunData {
  id: string;
  date: string;
  duration: string; // Formatted, e.g., "45:30"
  distanceKm: number;
  pace: string; // Formatted, e.g., "5:30" (min/km)
  runType: 'road' | 'trail';
  elevationGain: number | null; // meters
  route: PolarRoutePoint[] | null;
}
