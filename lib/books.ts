import fs from 'fs';
import path from 'path';
import type { Book, BooksData } from './types/api';

export function getBooks(): Book[] {
  const filePath = path.join(process.cwd(), 'data', 'books.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const data = JSON.parse(fileContents) as BooksData;
  return data.books;
}
