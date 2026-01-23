'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Muted } from '@/components/ui/typography';

function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

function getDaysInYear(year: number): number {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 366 : 365;
}

export default function YearCountdown(): React.ReactElement {
  const today = new Date();
  const year = today.getFullYear();
  const dayOfYear = getDayOfYear(today);
  const totalDays = getDaysInYear(year);
  const daysLeft = totalDays - dayOfYear;
  const percentage = Math.round((dayOfYear / totalDays) * 100);

  const dots = Array.from({ length: totalDays }, (_, i) => {
    const isPast = i < dayOfYear;
    return (
      <span
        key={i}
        className={`text-base text-center leading-none ${isPast ? 'text-foreground' : 'text-muted-foreground/40'}`}
      >
        {isPast ? '✦' : '•'}
      </span>
    );
  });

  return (
    <Card className="h-full w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base">Year</CardTitle>
        <Muted>{percentage}%</Muted>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-[3px] leading-none">
          {dots}
        </div>
        <Muted className="mt-3">
          {daysLeft} days left in {year}
        </Muted>
      </CardContent>
    </Card>
  );
}
