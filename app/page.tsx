import React from 'react';
import { fetchLocation } from '../lib/utils/api';
import Weather from '../components/weather';
import YearCountdown from '../components/year-countdown';
import LatestRun from '../components/latest-run';
import { H1, Muted } from '@/components/ui/typography';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';

export default async function Home(): Promise<React.ReactElement> {
  const location = await fetchLocation();

  return (
    <main className="container max-w-screen-xl mx-auto px-4 py-8">
      <section>
        <H1 className="font-serif leading-snug tracking-wide">I&apos;m Christian,</H1>
        <H1>a product designer</H1>
        <H1 >based in Aarhus.</H1>
        <Muted>
          {location.country} ({location.latitude}, {location.longitude})
        </Muted>
        <BentoGrid className="mt-8">
          <BentoGridItem colSpan={2} variant="ghost">
            <Weather />
          </BentoGridItem>
          <BentoGridItem colSpan={2} variant="ghost">
            <LatestRun />
          </BentoGridItem>
          <BentoGridItem colSpan={2} variant="ghost">
            <YearCountdown />
          </BentoGridItem>
        </BentoGrid>
      </section>
    </main>
  );
} 