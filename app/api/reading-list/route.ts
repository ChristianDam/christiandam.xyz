import { NextResponse } from 'next/server';
import { getBooks } from '../../../lib/books';
import type { BooksData } from '../../../lib/types/api';

export async function GET(): Promise<NextResponse<BooksData | { error: string }>> {
  try {
    const books = getBooks();

    return NextResponse.json<BooksData>({ books }, {
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
