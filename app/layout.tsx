import React from "react";
import type { Metadata } from "next";
import { ThemeProvider } from "../components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://christiandam.xyz"),
  title: {
    default: "Christian Dam",
    template: "%s | Christian Dam",
  },
  description: "Product designer crafting digital products and experiences.",
  openGraph: {
    type: "website",
    siteName: "Christian Dam",
    locale: "en_US",
  },
  twitter: {
    card: "summary",
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="min-h-screen bg-background font-sans antialiased"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
