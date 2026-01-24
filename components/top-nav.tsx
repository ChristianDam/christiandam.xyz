'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, Xmark } from 'iconoir-react';
import { Button } from './ui/button';
import { ThemeToggle } from './theme-toggle';

export function TopNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/thoughts', label: 'Thoughts' },
    { href: '/reading-list', label: 'Reading List' },
    { href: '/resume', label: 'Resume' },
  ];

  return (
    <nav aria-label="Main navigation" className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-screen-xl items-center justify-between px-4">
        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 items-center gap-2">
          {navLinks.map((link) => (
            <Button key={link.href} variant="ghost" asChild>
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <Xmark className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>

        {/* Right Section - Desktop and Mobile */}
        <div className="flex items-center gap-2">
          <Button className="hidden sm:inline-flex" variant="default" asChild>
            <Link href="/contact">Contact</Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Button
                key={link.href}
                variant="ghost"
                asChild
                className="w-full justify-start"
              >
                <Link href={link.href} onClick={() => setMobileMenuOpen(false)}>
                  {link.label}
                </Link>
              </Button>
            ))}
            <Button
              variant="default"
              asChild
              className="w-full justify-start sm:hidden"
            >
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}
