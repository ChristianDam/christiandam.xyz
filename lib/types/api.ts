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
}

export type BookStatus = 'next' | 'reading' | 'finished';

export interface Book {
  isbn: string;
  title: string;
  authors: string[];
  coverUrl: string;
  status: BookStatus;
}

export interface ReadingListData {
  books: Book[];
}