# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal design portfolio website for Christian Dam built with Next.js 13 (App Router), TypeScript, and Tailwind CSS. Features a markdown-based "writings" blog system with weather/location display.

## Behaviour

- If you are unsure then ask questions to the user
- Don't overcomplicate solutions, strive for the simplest solution

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
- `writings/page.tsx` - Writings index listing all published posts
- `writings/[slug]/page.tsx` - Dynamic writing detail pages (static generation via `generateStaticParams`)
- `api/location/route.ts` - IP-based geolocation endpoint
- `api/weather/route.ts` - Weather data endpoint

### Content System

Markdown files in `content/writings/` with YAML frontmatter:

- Required fields: `title`, `slug`, `description`, `published`, `createdAt`
- Optional: `tags`
- Drafts (`published: false`) only visible in development
- Parsing logic in `lib/writings.ts`

### Component Patterns

- UI primitives in `components/ui/` use class-variance-authority for variants
- Theme toggle via next-themes with CSS custom properties (HSL format)
- Client components marked with `"use client"` directive

### Type Definitions

- `lib/types/writing.ts` - WritingMeta and Writing interfaces
- `lib/types/api.ts` - LocationData and WeatherData interfaces

## MCP Servers

This project has three MCP servers configured in `.mcp.json`:

### TailwindCSS (`tailwindcss`)

Use for Tailwind-related tasks:

- Looking up utility classes by category or CSS property
- Converting CSS to Tailwind classes
- Generating color palettes
- Getting installation/configuration guides

### shadcn/ui (`shadcn`)

Use when working with UI components:

- Search for available components (`search_items_in_registries`)
- View component source code (`view_items_in_registries`)
- Get usage examples (`get_item_examples_from_registries`)
- Get install commands (`get_add_command_for_items`)
- Always run audit checklist after adding components

### Figma (`figma-remote-mcp`)

Use when the user provides Figma links:

- Extract design specs, colors, typography from Figma files
- Reference designs during implementation

## Skills

### Frontend Development (`/frontend-dev`)

Use this skill when building or modifying frontend code:

- Creating new pages, components, or API routes
- Implementing UI features with React/TypeScript
- Working with Server vs Client component patterns
- Styling with Tailwind CSS or shadcn/ui
- Data fetching patterns (server-side or client-side)
- TypeScript best practices for props and types

The skill provides patterns for CVA-based UI primitives, page layouts, dynamic routes with static generation, and the project's conventions.

## Key Conventions

- Path alias: `@/*` maps to project root
- Tailwind dark mode via class strategy
- Custom fonts: Haskoy (sans), Libre Caslon (serif) - local .woff2 files
- Location data cached for 1 hour to prevent API abuse
- Always use sentence case for content
