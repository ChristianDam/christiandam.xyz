import React from 'react';
import Link from 'next/link';
import { fetchLocation } from '../lib/utils/api';
import Weather from '../components/weather';
import YearCountdown from '../components/year-countdown';
import { H1, H2, P, Muted } from '@/components/ui/typography';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';

export default async function Home(): Promise<React.ReactElement> {
  const location = await fetchLocation();

  return (
    <main className="container max-w-screen-xl mx-auto px-4 py-8">
      <section className="py-12 border-b">
        <H1 >I&apos;m Christian,</H1>
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
            <YearCountdown />
          </BentoGridItem>
        </BentoGrid>
      </section>

      <section className="py-12 border-b">
        <H2>About</H2>
        <P>
          I&apos;m currently working @{' '}
          <Link
            href="https://righthub.com/"
            className="text-primary hover:underline"
          >
            Righthub
          </Link>{' '}
          and also building{' '}
          <Link href="#" className="text-primary hover:underline">
            Togæther
          </Link>
          . When I&apos;m not designing, you can find me on {location.city}&apos;s playgrounds 🛝
          with my kid or playing pizzaiolo 👨🏻‍🍳🍕.
        </P>
      </section>

      <section className="py-12 border-b">
        <H2>Selected work</H2>
        <P>
          A mix of new and old work. Head to{' '}
          <Link href="#" className="text-primary hover:underline">
            Work
          </Link>{' '}
          to see all.
        </P>
      </section>
    </main>
  );
} 