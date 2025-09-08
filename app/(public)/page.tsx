import Link from 'next/link'
import Image from 'next/image'
import { existsSync, readdirSync } from 'node:fs'
import type { Metadata } from 'next'
import { listArticles } from '@/lib/data'
import HomeTiles from '@/components/HomeTiles'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'AI, explained for everyday people — TheTechPencil',
  description: 'Weekly Signals and simple explainers. Sources first. Clear actions next.'
}

export default async function HomePage() {
  const articles = await listArticles()
  const featured = articles?.slice(0, 1) || []
  // Discover any images the user placed under public/brand and pick sensible defaults.
  const brandDir = 'public/brand'
  const hasBrand = existsSync(brandDir)
  const brandImages = hasBrand
    ? readdirSync(brandDir)
        .filter((f) => /\.(jpe?g|png|webp|svg)$/i.test(f))
        .map((f) => `/brand/${f}`)
    : []
  const pickBy = (keywords: string[], used: Set<string>) => {
    const lower = (s: string) => s.toLowerCase()
    for (const img of brandImages) {
      if (used.has(img)) continue
      const name = lower(img)
      if (keywords.some((k) => name.includes(k))) return img
    }
    for (const img of brandImages) { if (!used.has(img)) return img }
    return null
  }
  const chosen = new Set<string>()
  // Prefer an outdoor/building shot as hero if present
  const heroSrc =
    pickBy(['outside','exterior','building','plaque','street','bridge','brooklyn'], chosen) ||
    pickBy(['hero','lobby','main'], chosen) ||
    '/sample/hero-2.svg'
  if (heroSrc.startsWith('/brand/')) chosen.add(heroSrc)
  const signSrc = pickBy(['sign','logo','lobby'], chosen) || '/sample/hero-1.svg'
  if (signSrc.startsWith('/brand/')) chosen.add(signSrc)
  const exteriorSrc = pickBy(['outside','exterior','building'], chosen) || '/sample/hero-3.svg'
  // Build a gallery of up to 3 items that never reuses the hero image
  const gallery = brandImages.filter((src) => src !== heroSrc).slice(0, 3)

  return (
    <div className="space-y-12">
      {/* Full‑bleed hero with overlay */}
      <section className="relative -mx-4 sm:mx-0">
        <div className="relative aspect-[9/5] sm:aspect-[16/7] w-full overflow-hidden rounded-none sm:rounded-xl shadow-sm">
          <Image src={heroSrc} alt="TheTechPencil outdoor hero image" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
            <div className="max-w-2xl text-white">
              <p className="mb-2 text-sm sm:text-base font-semibold tracking-wide opacity-95">TheTechPencil</p>
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-serif leading-tight tracking-tight drop-shadow whitespace-nowrap">AI, explained for everyday people.</h1>
              <div className="mt-4 flex gap-3">
                <Link href="/login" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-brand text-white shadow hover:shadow-md hover:-translate-y-px active:translate-y-0">Join free</Link>
                <Link href="/articles" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white/90 text-gray-900 hover:bg-white">Read the Blog</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value prop */}
      <section className="prose dark:prose-invert">
        <p>TheTechPencil is an evidence‑first publication. We track the moving parts of AI—models, chips, data, energy, policy—and translate them into clear guidance. Dates are explicit. Numbers match sources. Claims are testable.</p>
      </section>

      {/* Task‑first tiles */}
      <HomeTiles />

      {gallery.length > 0 && (
        <section className="grid sm:grid-cols-3 gap-4 not-prose">
          {gallery.map((src, i) => (
            <div key={src} className="relative aspect-[4/3] rounded-xl overflow-hidden border shadow-sm">
              <Image src={src} alt={i === 0 ? 'TheTechPencil circular light logo panel in lobby' : 'TheTechPencil brand photography'} fill className="object-cover transition-transform duration-150 ease-out will-change-transform hover:scale-[1.03]" />
            </div>
          ))}
        </section>
      )}

      <section className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-2 font-serif">Latest from the Blog</h2>
          <ul className="divide-y">
            {articles?.slice(0,4).map((a: any) => (
              <li key={a.id} className="py-3">
                <Link href={`/articles/${a.slug}`} className="font-serif link-underline transition-colors duration-200">{a.title}</Link>
                {a.subhead && <p className="text-sm text-muted-foreground">{a.subhead}</p>}
              </li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-1 rounded-xl border p-5 bg-card shadow-sm">
          <h2 className="font-serif text-xl mb-2">Featured</h2>
          {featured.length === 0 && <p className="text-sm text-muted-foreground">No featured post yet.</p>}
          {featured.map((a: any) => (
            <div key={a.id}>
              <Link href={`/articles/${a.slug}`} className="link-underline transition-colors duration-200">{a.title}</Link>
              {a.subhead && <p className="text-sm text-muted-foreground mt-1">{a.subhead}</p>}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
