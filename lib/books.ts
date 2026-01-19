import fs from 'fs';
import path from 'path';
import type { Book, BooksData } from './types/api';

export function getBooks(): Book[] {
  try {
    const filePath = path.join(process.cwd(), 'data', 'books.json');
    
    if (!fs.existsSync(filePath)) {
      console.error('Books data file not found:', filePath);
      return [];
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents) as BooksData;
    
    if (!data.books || !Array.isArray(data.books)) {
      console.error('Invalid books data structure');
      return [];
    }
    
    return data.books;
  } catch (error) {
    console.error('Error reading books data:', error);
    return [];
  }
}
