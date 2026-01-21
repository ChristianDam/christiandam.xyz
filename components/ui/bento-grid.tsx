import * as React from 'react';

import { cn } from '@/lib/utils';

type BentoGridProps = React.HTMLAttributes<HTMLDivElement>;

const BentoGrid = React.forwardRef<HTMLDivElement, BentoGridProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4',
        className
      )}
      {...props}
    />
  )
);
BentoGrid.displayName = 'BentoGrid';

interface BentoGridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  colSpan?: 1 | 2 | 3 | 4;
  rowSpan?: 1 | 2 | 3 | 4;
  variant?: 'default' | 'ghost';
}

const BentoGridItem = React.forwardRef<HTMLDivElement, BentoGridItemProps>(
  ({ className, colSpan = 1, rowSpan = 1, variant = 'default', ...props }, ref) => {
    const colSpanClasses = {
      1: 'col-span-1',
      2: 'col-span-1 sm:col-span-2',
      3: 'col-span-1 sm:col-span-2 lg:col-span-3',
      4: 'col-span-1 sm:col-span-2 lg:col-span-4',
    };

    const rowSpanClasses = {
      1: 'row-span-1',
      2: 'row-span-2',
      3: 'row-span-3',
      4: 'row-span-4',
    };

    const variantClasses = {
      default: 'rounded-xl border bg-card text-card-foreground shadow',
      ghost: '',
    };

    return (
      <div
        ref={ref}
        className={cn(
          colSpanClasses[colSpan],
          rowSpanClasses[rowSpan],
          variantClasses[variant],
          className
        )}
        {...props}
      />
    );
  }
);
BentoGridItem.displayName = 'BentoGridItem';

export { BentoGrid, BentoGridItem };
