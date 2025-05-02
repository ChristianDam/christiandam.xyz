import { NextResponse } from 'next/server';
import type { FootballMatch } from '../../../lib/types/api';

export async function GET(): Promise<NextResponse<FootballMatch[]>> {
  // In a real implementation, you would fetch this data from a football API
  const matches: FootballMatch[] = [];

  return NextResponse.json(matches);
} 