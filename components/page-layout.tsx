import { cn } from "@/lib/utils";
import * as React from "react";

interface PageLayoutProps {
  children: React.ReactNode;
  maxWidth?: "default" | "narrow";
  className?: string;
}

export function PageLayout({ children, className }: PageLayoutProps) {
  return (
    <main className={cn("max-w-screen-md mx-auto py-20 px-4", className)}>
      {children}
    </main>
  );
}
