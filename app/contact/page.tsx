import React from 'react';
import { Muted } from '@/components/ui/typography';
import { PageLayout } from '@/components/page-layout';
import { PageHeader } from '@/components/page-header';

export const metadata = {
  title: 'Contact | christiandam.xyz',
  description: 'Get in touch with Christian Dam.',
};

export default function ContactPage(): React.ReactElement {
  return (
    <PageLayout>
      <PageHeader title="Contact" />
      <section className="py-12">
        <Muted>Coming soon.</Muted>
      </section>
    </PageLayout>
  );
}
