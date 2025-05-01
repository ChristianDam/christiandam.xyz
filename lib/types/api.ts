export interface LocationData {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
  timezone: string;
}

export interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  forecast: {
    date: string;
    high: number;
    low: number;
    condition: string;
  }[];
}

export interface FootballMatch {
  homeTeam: string;
  awayTeam: string;
  score: string;
  date: string;
  competition: string;
  status: 'completed' | 'live' | 'scheduled';
}

export interface MusicPlaylist {
  id: string;
  name: string;
  tracks: {
    id: string;
    title: string;
    artist: string;
    album: string;
    duration: number;
    coverUrl: string;
  }[];
}

export interface TrainingMetrics {
  date: string;
  type: string;
  duration: number;
  distance?: number;
  calories?: number;
  heartRate?: {
    average: number;
    max: number;
  };
  pace?: {
    average: string;
    best: string;
  };
} 