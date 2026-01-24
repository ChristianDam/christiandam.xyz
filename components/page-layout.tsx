import * as React from 'react';
import { cn } from '@/lib/utils';

interface PageLayoutProps {
  children: React.ReactNode;
  maxWidth?: 'default' | 'narrow';
  className?: string;
}

export function PageLayout({
  children,
  maxWidth = 'default',
  className,
}: PageLayoutProps) {
  return (
    <main
      className={cn(
        'container mx-auto px-4 py-4',
        maxWidth === 'default' ? 'max-w-screen-xl' : 'max-w-2xl',
        className
      )}
    >
      {children}
    </main>
  );
}
