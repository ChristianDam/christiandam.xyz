'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import { ThemeToggle } from './theme-toggle';

export function TopNav() {
  return (
    <nav aria-label="Main navigation" className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-screen-xl items-center px-4">
        <div className="flex flex-1 items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/">Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/thoughts">Thoughts</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/reading-list">Reading List</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/resume">Resume</Link>
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="default" asChild>
            <Link href="/contact">Contact</Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
