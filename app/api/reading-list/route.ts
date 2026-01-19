import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface Book {
  isbn: string;
  title: string;
  authors: string[];
  coverUrl: string;
  status: 'next' | 'reading' | 'finished';
}

interface BooksData {
  books: Book[];
}

export async function GET(): Promise<NextResponse<BooksData | { error: string }>> {
  try {
    const filePath = path.join(process.cwd(), 'data', 'books.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContents) as BooksData;

    return NextResponse.json<BooksData>(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error reading books data:', error);
    return NextResponse.json<{ error: string }>(
      { error: 'Failed to load reading list' },
      { status: 500 }
    );
  }
}
