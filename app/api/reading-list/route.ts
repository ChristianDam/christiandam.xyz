import { NextResponse } from 'next/server';
import type { ReadingListData } from '@/lib/types/book';
import booksData from '@/data/books.json';

export async function GET(): Promise<NextResponse<ReadingListData>> {
  return NextResponse.json<ReadingListData>(booksData as ReadingListData);
}
