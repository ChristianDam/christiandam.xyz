# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal design portfolio website for Christian Dam built with Next.js 13 (App Router), TypeScript, and Tailwind CSS. Features a markdown-based "thoughts" blog system with weather/location display.

## Commands

```bash
bun run dev      # Start development server
bun run build    # Production build
bun run lint     # Run ESLint
bun start        # Start production server
```

## Architecture

### App Router Structure (`app/`)
- `page.tsx` - Homepage with location/weather display
- `thoughts/page.tsx` - Thoughts index listing all published posts
- `thoughts/[slug]/page.tsx` - Dynamic thought detail pages (static generation via `generateStaticParams`)
- `api/location/route.ts` - IP-based geolocation endpoint
- `api/weather/route.ts` - Weather data endpoint

### Content System
Markdown files in `content/thoughts/` with YAML frontmatter:
- Required fields: `title`, `slug`, `description`, `published`, `createdAt`
- Optional: `tags`
- Drafts (`published: false`) only visible in development
- Parsing logic in `lib/thoughts.ts`

### Component Patterns
- UI primitives in `components/ui/` use class-variance-authority for variants
- Theme toggle via next-themes with CSS custom properties (HSL format)
- Client components marked with `"use client"` directive

### Type Definitions
- `lib/types/thought.ts` - ThoughtMeta and Thought interfaces
- `lib/types/api.ts` - LocationData and WeatherData interfaces

## Key Conventions

- Path alias: `@/*` maps to project root
- Tailwind dark mode via class strategy
- Custom fonts: Haskoy (sans), Libre Caslon (serif) - local .woff2 files
- Location data cached for 1 hour to prevent API abuse
