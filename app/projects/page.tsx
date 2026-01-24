import React from 'react';
import { Muted } from '@/components/ui/typography';
import { PageLayout } from '@/components/page-layout';
import { PageHeader } from '@/components/page-header';

export const metadata = {
  title: 'Projects | christiandam.xyz',
  description: 'Projects by Christian Dam.',
};

export default function ProjectsPage(): React.ReactElement {
  return (
    <PageLayout>
      <PageHeader title="Projects" />
      <section className="py-12">
        <Muted>Coming soon.</Muted>
      </section>
    </PageLayout>
  );
}
