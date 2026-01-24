import * as React from 'react';
import { H1, P } from '@/components/ui/typography';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section>
      <H1 className="font-serif text-4xl md:text-[80px] leading-tight tracking-tight">
        {title}
      </H1>
      {subtitle && (
        <P className="text-base text-muted-foreground">{subtitle}</P>
      )}
    </section>
  );
}
