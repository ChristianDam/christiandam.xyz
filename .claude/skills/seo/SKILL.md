---
name: seo
description: SEO audit and maintenance for christiandam.xyz. Use when adding new pages, writing posts, or making content changes. Covers metadata requirements, Open Graph tags, sitemap updates, JSON-LD structured data, and writing frontmatter completeness. Trigger on requests like "add a page", "new writing", "add route", or any task that creates or modifies pages and content.
---

# SEO Maintenance — christiandam.xyz

## Foundations already in place

- `app/robots.ts` — allows all crawlers, references sitemap
- `app/sitemap.ts` — static routes + dynamic writings via `getPublishedWritings()`
- `app/layout.tsx` — `metadataBase`, title template (`%s | Christian Dam`), base OG/Twitter config
- `app/page.tsx` — Person JSON-LD schema
- `app/writings/[slug]/page.tsx` — OG article tags, canonical URL, BlogPosting JSON-LD

---

## Checklist: new page

When creating any new `app/*/page.tsx`, verify:

- [ ] **Metadata export** — bare title string (template auto-appends `| Christian Dam`)
- [ ] **OG tags** — include `openGraph.title`, `openGraph.description`, `openGraph.url`, `openGraph.type`
- [ ] **Canonical URL** — `alternates.canonical` set to the page's absolute URL
- [ ] **Sitemap** — if the route is a top-level public page, add it to the static routes in `app/sitemap.ts`

```ts
// Minimum metadata for a new page
export const metadata: Metadata = {
  title: 'Page Name',
  description: 'One sentence describing the page.',
  alternates: {
    canonical: 'https://christiandam.xyz/page-name',
  },
  openGraph: {
    title: 'Page Name',
    description: 'One sentence describing the page.',
    url: 'https://christiandam.xyz/page-name',
    type: 'website',
  },
}
```

Do NOT manually append `| Christian Dam` — the root layout title template handles this.

---

## Checklist: new writing post

When adding a file to `content/writings/`:

- [ ] `title` — concise, sentence case
- [ ] `description` — one sentence summary (used as meta description and OG description)
- [ ] `slug` — matches the filename (without `.md`)
- [ ] `published: true` — set when ready to go live (drafts are `false`)
- [ ] `createdAt` — ISO date string (`YYYY-MM-DD`)
- [ ] `tags` — optional but recommended for OG article tags

The sitemap and OG tags on the writing detail page are generated automatically from these fields — no extra code needed.

---

## Checklist: new experience or project detail page

If the page warrants structured data (e.g., a case study or featured project):

- [ ] Add `WebPage` or `CreativeWork` JSON-LD inline in the server component
- [ ] Include `name`, `description`, `url`, and `author` at minimum

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: 'Project Name',
      description: 'Short description.',
      url: 'https://christiandam.xyz/projects/project-name',
      author: { '@type': 'Person', name: 'Christian Dam', url: 'https://christiandam.xyz' },
    }),
  }}
/>
```

---

## P2: OG image (not yet done)

A default OG image is missing. When ready:

1. **Static** (simplest): place a `1200×630` PNG at `app/opengraph-image.png`. Next.js serves it automatically as the default OG image for all pages.
2. **Dynamic per-writing**: create `app/writings/[slug]/opengraph-image.tsx` using Next.js `ImageResponse` (built-in, no package needed).

---

## Sitemap: when to update manually

`app/sitemap.ts` auto-includes all published writings. Manual update needed only when adding new **top-level static routes** (e.g., a new `/uses` or `/now` page):

```ts
{ url: `${BASE_URL}/new-route`, lastModified: new Date() },
```
