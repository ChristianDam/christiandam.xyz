'use client';

import * as React from 'react';
import { SunLight, HalfMoon } from 'iconoir-react';
import { useTheme } from 'next-themes';

import { Button } from './ui/button';

export function ThemeToggle(): React.ReactElement {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      className='h-8 w-8 text-muted-foreground'
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <SunLight className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <HalfMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
} 