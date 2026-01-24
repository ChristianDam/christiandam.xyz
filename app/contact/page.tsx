import React from 'react';
import { H1, Muted } from '@/components/ui/typography';

export const metadata = {
  title: 'Contact | christiandam.xyz',
  description: 'Get in touch with Christian Dam.',
};

export default function ContactPage(): React.ReactElement {
  return (
    <main className="container mx-auto max-w-screen-xl px-4 py-8">
      <section>
        <H1>Contact</H1>
        <Muted className="mt-4">Coming soon.</Muted>
      </section>
    </main>
  );
}
