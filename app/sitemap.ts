import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  return [
    '', '/articles', '/research', '/pricing', '/about',
  ].map((p) => ({ url: base + p, changeFrequency: 'weekly', priority: 0.7 }))
}

