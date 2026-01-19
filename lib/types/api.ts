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

export interface Book {
  isbn: string;
  title: string;
  authors: string[];
  coverUrl: string;
  status: 'next' | 'reading' | 'finished';
}

export interface BooksData {
  books: Book[];
}