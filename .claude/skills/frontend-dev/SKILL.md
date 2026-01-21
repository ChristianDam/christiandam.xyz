---
name: frontend-dev
description: Frontend development guidance for Next.js App Router with TypeScript and Tailwind CSS. Use when building pages, components, API routes, or implementing UI features. Covers component architecture, server vs client patterns, data fetching, styling with Tailwind/shadcn, and TypeScript best practices.
---

# Frontend Development

Best practices for building high-quality Next.js applications with TypeScript and Tailwind CSS.

## Project Structure

```
app/                    # App Router pages and layouts
  page.tsx             # Route component (default Server Component)
  layout.tsx           # Shared layout with providers
  api/                 # API routes
    [endpoint]/route.ts
components/
  ui/                  # Primitive components (button, card, typography)
  [feature].tsx        # Feature-specific components
lib/
  types/               # TypeScript interfaces
  utils.ts             # Shared utilities (cn helper)
  utils/               # Domain-specific utilities
content/               # Static content (markdown, etc.)
```

## Component Patterns

### Server Components (Default)

Use for pages and data-fetching components:

```tsx
// app/page.tsx
import { H1, P } from '@/components/ui/typography';

export default async function Page() {
  const data = await fetchData(); // Direct async/await
  return (
    <main className="container mx-auto px-4 py-8">
      <H1>{data.title}</H1>
    </main>
  );
}
```

### Client Components

Add `"use client"` only when needed (hooks, browser APIs, interactivity):

```tsx
'use client';

import { useState, useEffect } from 'react';

export default function Interactive() {
  const [state, setState] = useState(null);
  // Client-side logic here
}
```

### UI Primitives with CVA

Use class-variance-authority for variant-based components:

```tsx
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        outline: 'border border-input bg-background hover:bg-accent',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 px-3 text-xs',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button className={cn(buttonVariants({ variant, size, className }))} {...props} />
  );
}
```

### Typography Components

Wrap semantic elements with consistent styling:

```tsx
export function H1({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={cn('scroll-m-20 text-4xl font-extrabold tracking-tight', className)}
      {...props}
    />
  );
}
```

## Page Structure

### Standard Page Layout

```tsx
export default function Page() {
  return (
    <main className="container mx-auto px-4 py-8">
      <section className="py-12 border-b">
        {/* Section content */}
      </section>
    </main>
  );
}
```

### Dynamic Routes with Static Generation

```tsx
// app/[slug]/page.tsx
interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const slugs = getSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const item = getItem(params.slug);
  return { title: item?.title, description: item?.description };
}

export default function Page({ params }: PageProps) {
  const item = getItem(params.slug);
  if (!item) notFound();
  return <main>{/* content */}</main>;
}
```

## API Routes

```tsx
// app/api/endpoint/route.ts
import { NextResponse } from 'next/server';

interface ResponseData { /* typed response */ }
interface ErrorResponse { error: string }

export async function GET(): Promise<NextResponse<ResponseData | ErrorResponse>> {
  try {
    const data = await fetchExternalAPI();
    return NextResponse.json<ResponseData>(data);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json<ErrorResponse>({ error: 'Failed' }, { status: 500 });
  }
}
```

## Styling Guidelines

### Tailwind Conventions

- Use `cn()` helper for conditional classes
- Prefer semantic color tokens: `bg-background`, `text-foreground`, `text-muted-foreground`
- Container pattern: `container mx-auto px-4`
- Spacing sections: `py-8`, `py-12`, `space-y-4`
- Responsive prefixes: `md:text-6xl`, `lg:grid-cols-3`

### Dark Mode

Theme toggle via next-themes with class strategy. Use CSS custom properties (HSL format) in globals.css.

## TypeScript Patterns

### Type Definitions

```tsx
// lib/types/feature.ts
export interface FeatureMeta {
  title: string;
  slug: string;
  published: boolean;
  createdAt: string;
}

export interface Feature {
  meta: FeatureMeta;
  content: string;
}
```

### Component Props

```tsx
interface ComponentProps {
  children: React.ReactNode;
  className?: string;
}

// Extend HTML attributes for native element wrappers
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
}
```

## Data Fetching Patterns

### Server-Side (in Server Components)

```tsx
async function fetchData() {
  const res = await fetch(url, { next: { revalidate: 3600 } }); // Cache 1 hour
  return res.json();
}
```

### Client-Side (in Client Components)

```tsx
const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  fetch('/api/endpoint')
    .then(res => res.json())
    .then(setData)
    .catch(setError)
    .finally(() => setLoading(false));
}, []);
```

## Checklist

Before completing a page or component:

- [ ] TypeScript: All props and data typed, no `any`
- [ ] Server/Client: `"use client"` only where necessary
- [ ] Accessibility: Semantic HTML, proper heading hierarchy
- [ ] Responsive: Mobile-first, tested at breakpoints
- [ ] Loading/Error states: Handled for async operations
- [ ] Metadata: `generateMetadata` for dynamic pages
