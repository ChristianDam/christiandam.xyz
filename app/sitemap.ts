import { MetadataRoute } from 'next'
import { getPublishedWritings } from '@/lib/writings'

const BASE_URL = 'https://christiandam.xyz'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date() },
    { url: `${BASE_URL}/writings`, lastModified: new Date() },
    { url: `${BASE_URL}/projects`, lastModified: new Date() },
    { url: `${BASE_URL}/reading-list`, lastModified: new Date() },
    { url: `${BASE_URL}/contact`, lastModified: new Date() },
  ]

  const writingRoutes: MetadataRoute.Sitemap = getPublishedWritings().map((writing) => ({
    url: `${BASE_URL}/writings/${writing.slug}`,
    lastModified: new Date(writing.meta.createdAt),
  }))

  return [...staticRoutes, ...writingRoutes]
}
