import { NextResponse } from 'next/server';
import type { ReadingListData } from '../../../lib/types/api';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET(): Promise<NextResponse<ReadingListData>> {
  try {
    const filePath = join(process.cwd(), 'data', 'books.json');
    const fileContents = readFileSync(filePath, 'utf8');
    const data: ReadingListData = JSON.parse(fileContents);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading books data:', error);
    
    // Return empty list in case of error
    return NextResponse.json({
      books: [],
    });
  }
}
