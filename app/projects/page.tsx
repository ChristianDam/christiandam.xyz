import React from 'react';
import { H1, Muted } from '@/components/ui/typography';

export const metadata = {
  title: 'Projects | christiandam.xyz',
  description: 'Projects by Christian Dam.',
};

export default function ProjectsPage(): React.ReactElement {
  return (
    <main className="container mx-auto max-w-screen-xl px-4 py-8">
      <section>
        <H1>Projects</H1>
        <Muted className="mt-4">Coming soon.</Muted>
      </section>
    </main>
  );
}
