import { MetadataRoute } from 'next'
import { getPublishedWritings } from '@/lib/writings'

const BASE_URL = 'https://christiandam.xyz'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL },
    { url: `${BASE_URL}/writings` },
    { url: `${BASE_URL}/projects` },
    { url: `${BASE_URL}/reading-list` },
    { url: `${BASE_URL}/contact` },
  ]

  const writingRoutes: MetadataRoute.Sitemap = getPublishedWritings().map((writing) => ({
    url: `${BASE_URL}/writings/${writing.slug}`,
    lastModified: new Date(writing.meta.createdAt),
  }))

  return [...staticRoutes, ...writingRoutes]
}
