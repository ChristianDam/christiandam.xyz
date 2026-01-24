'use client';

import { useState, useEffect, useRef } from 'react';
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

export function TopNav() {
  const pathname = usePathname();
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const [hoverStyle, setHoverStyle] = useState<{
    width: number;
    transform: string;
    opacity: number;
  }>({ width: 0, transform: 'translateX(0)', opacity: 0 });
  const rafRef = useRef<number | null>(null);
  const lastOpacityRef = useRef(1);

  useEffect(() => {
    const updateOpacity = () => {
      const opacity = Math.max(0, 1 - window.scrollY / 100);
      if (opacity !== lastOpacityRef.current) {
        lastOpacityRef.current = opacity;
        setScrollOpacity(opacity);
      }
    };

    const handleScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        updateOpacity();
        rafRef.current = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateOpacity();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <nav
      aria-label="Main navigation"
      className="pointer-events-none flex items-center justify-center px-1 py-4 md:justify-between"
    >
      {/* Left section - Main navigation (stays visible) */}
      <div
        className="pointer-events-auto relative flex rounded-lg border border-border bg-background/70 p-1 shadow-md backdrop-blur-md"
        onMouseLeave={() =>
          setHoverStyle((prev) => ({ ...prev, opacity: 0 }))
        }
      >
        <div
          className="absolute left-0 -z-10 h-7 rounded bg-secondary backdrop-blur transition-[width,transform,opacity]"
          style={{
            transitionDuration: '150ms',
            opacity: hoverStyle.opacity,
            width: hoverStyle.width,
            transform: hoverStyle.transform,
          }}
        />
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'relative rounded px-2 py-1 text-sm tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
              'hover:text-foreground',
              pathname === link.href
                ? 'text-foreground'
                : 'text-muted-foreground'
            )}
            onMouseEnter={(e) => {
              const target = e.currentTarget;
              setHoverStyle({
                width: target.offsetWidth,
                transform: `translateX(${target.offsetLeft}px)`,
                opacity: 1,
              });
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Right section - Social links (fades on scroll) */}
      <div
        className={cn(
          'hidden transition-opacity duration-200 md:flex',
          scrollOpacity > 0 ? 'pointer-events-auto' : 'pointer-events-none'
        )}
        style={{ opacity: scrollOpacity }}
      >
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
                'rounded px-2 py-1 text-sm tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
                'text-muted-foreground decoration-wavy underline-offset-4',
                'hover:text-foreground hover:underline',
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
