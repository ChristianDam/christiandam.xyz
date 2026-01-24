import * as React from 'react';
import { H1, P } from '@/components/ui/typography';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section>
      <H1 className="font-serif leading-tight font-bold text-5xl mb-2">
        {title}
      </H1>
      {subtitle && (
        <P className="text-muted-foreground">{subtitle}</P>
      )}
    </section>
  );
}
