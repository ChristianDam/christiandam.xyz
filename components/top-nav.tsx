'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, Xmark, Github, Linkedin } from 'iconoir-react';
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
        <div className="hidden md:flex flex-1 items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-foreground hover:text-foreground/80 transition-colors"
            >
              {link.label}
            </Link>
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
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            href="https://github.com/ChristianDam"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center text-sm text-foreground hover:text-foreground/80 transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </Link>
          <Link
            href="https://linkedin.com/in/christiandam"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center text-sm text-foreground hover:text-foreground/80 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </Link>
          <Link
            href="/contact"
            className="hidden sm:inline-block text-sm text-foreground hover:text-foreground/80 transition-colors"
          >
            Contact
          </Link>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="mx-auto w-full px-6 py-4 flex flex-col gap-3 md:max-w-screen-xl">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm text-foreground hover:text-foreground/80 transition-colors py-2"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm text-foreground hover:text-foreground/80 transition-colors py-2 sm:hidden"
            >
              Contact
            </Link>
            <div className="flex items-center gap-4 pt-2 sm:hidden">
              <Link
                href="https://github.com/ChristianDam"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-foreground hover:text-foreground/80 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="https://linkedin.com/in/christiandam"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-sm text-foreground hover:text-foreground/80 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
