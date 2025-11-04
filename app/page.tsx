import React from 'react';
import Link from 'next/link';
import { fetchLocation } from '../lib/utils/api';
import Weather from '../components/weather';

export default async function Home(): Promise<React.ReactElement> {
  const location = await fetchLocation();

  return (
    <main className="container mx-auto px-4 py-8">
      <section className="py-12 border-b">
        <h1 className="text-4xl md:text-8xl font-bold tracking-tight">
          I&apos;m Christian,
        </h1>
        <h1 className="text-4xl md:text-8xl font-bold tracking-tight">
          a product designer
        </h1>
        <h1 className="text-4xl md:text-8xl font-bold tracking-tight">
          based in Aarhus.
        </h1>
        <p className="text-muted-foreground mt-4">
          {location.country} ({location.latitude}, {location.longitude})
        </p>
        <div className="mt-8">
          <Weather />
        </div>
      </section>

      <section className="py-12 border-b">
        <h2 className="text-muted-foreground mb-4">About</h2>
        <p className="text-lg md:text-2xl">
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
        </p>
      </section>

      <section className="py-12 border-b">
        <h2 className="text-3xl md:text-5xl font-medium mb-4">Selected work</h2>
        <p className="text-lg md:text-xl text-muted-foreground">
          A mix of new and old work. Head to{' '}
          <Link href="#" className="text-primary hover:underline">
            Work
          </Link>{' '}
          to see all.
        </p>
      </section>

      <section className="py-12">
        <h2 className="text-muted-foreground mb-4">More</h2>
        <div className="flex flex-col gap-2">
          <Link
            href="/articles"
            className="text-lg md:text-xl text-primary hover:underline"
          >
            Articles →
          </Link>
          <Link
            href="/reads"
            className="text-lg md:text-xl text-primary hover:underline"
          >
            My Reads →
          </Link>
        </div>
      </section>
    </main>
  );
} 