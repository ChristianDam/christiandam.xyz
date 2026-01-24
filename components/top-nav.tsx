'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Christian' },
  { href: '/projects', label: 'Projects' },
  { href: '/thoughts', label: 'Writing' },
  { href: '/reading-list', label: 'Reading' },
];

const socialLinks = [
  { href: 'https://github.com/ChristianDam', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/christian-dam/', label: 'LinkedIn' },
  { href: '/contact', label: 'Contact' },
];

export function TopNav(): React.ReactElement {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Main navigation"
      className="pointer-events-none sticky top-0 isolate z-10 flex items-center justify-center px-1 py-4 md:justify-between"
    >
      {/* Left section - Main navigation */}
      <div
        className="pointer-events-auto relative flex rounded-lg border border-neutral-200 bg-white/70 p-1 shadow-md backdrop-blur-md dark:border-neutral-700 dark:bg-neutral-900/70"
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'rounded px-2 py-1 text-sm tracking-tight transition-colors',
              'focus-visible:ring-4 focus-visible:ring-blue-200 focus:text-neutral-900 dark:focus:text-neutral-100',
              'hover:text-neutral-900 dark:hover:text-neutral-100',
              pathname === link.href
                ? 'text-neutral-900 dark:text-neutral-100'
                : 'text-neutral-400 dark:text-neutral-500'
            )}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Right section - Social links */}
      <div className="pointer-events-auto hidden transition-opacity md:flex">
        {socialLinks.map((link) => {
          const isExternal = link.href.startsWith('http');
          return (
            <Link
              key={link.href}
              href={link.href}
              {...(isExternal && {
                target: '_blank',
                rel: 'noopener noreferrer',
              })}
              className={cn(
                'rounded px-2 py-1 text-sm tracking-tight transition-colors',
                'text-neutral-400 decoration-wavy underline-offset-4 dark:text-neutral-500',
                'focus-visible:ring-4 focus-visible:ring-blue-200 focus:text-neutral-900 dark:focus:text-neutral-100',
                'hover:text-neutral-900 hover:underline dark:hover:text-neutral-100',
                isExternal && 'cursor-alias'
              )}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
