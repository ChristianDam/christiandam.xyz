import { NextResponse } from 'next/server';
import type { TrainingMetrics } from '../../../lib/types/api';

export async function GET(): Promise<NextResponse<TrainingMetrics[]>> {
  // In a real implementation, you would fetch this data from a fitness tracking API
  const metrics: TrainingMetrics[] = [];

  return NextResponse.json(metrics);
} 