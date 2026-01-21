import React from 'react';
import './globals.css';
import localFont from 'next/font/local';
import { ThemeProvider } from '../components/theme-provider';
import { ThemeToggle } from '../components/theme-toggle';

const haskoy = localFont({
  src: '../public/fonts/Haskoy.woff2',
  variable: '--font-haskoy',
  display: 'swap',
});

const libreCaslonCondensed = localFont({
  src: '../public/fonts/Libre Caslon Condensed.woff2',
  variable: '--font-libre-caslon',
  display: 'swap',
});

export const metadata = {
  title: 'christiandam.xyz',
  description: 'My space on the internet.',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${haskoy.variable} ${libreCaslonCondensed.variable} min-h-screen bg-background font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="fixed right-4 top-4">
            <ThemeToggle />
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
} 