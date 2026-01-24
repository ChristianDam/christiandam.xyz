'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, Xmark } from 'iconoir-react';
import { Button } from './ui/button';
import { ThemeToggle } from './theme-toggle';

export function TopNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/thoughts', label: 'Thoughts' },
    { href: '/reading-list', label: 'Reading List' },
    { href: '/resume', label: 'Resume' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav aria-label="Main navigation" className={`sticky top-0 z-50 w-full bg-background ${isScrolled ? 'border-b' : ''}`}>
      <div className="mx-auto flex h-14 w-full items-center justify-between px-6 md:max-w-screen-xl">
        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 items-center gap-2">
          {navLinks.map((link) => (
            <Button key={link.href} variant="ghost" size="sm" asChild>
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <Button
            variant="ghost"
            size="sm"
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
          <Button className="hidden sm:inline-flex" variant="default" size="sm" asChild>
            <Link href="/contact">Contact</Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="mx-auto w-full px-6 py-4 flex flex-col gap-2 md:max-w-screen-xl">
            {navLinks.map((link) => (
              <Button
                key={link.href}
                variant="ghost"
                size="sm"
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
              size="sm"
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
