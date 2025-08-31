import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { listArticles } from '@/lib/data'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'AI, explained for everyday people — The Tech Pencil',
  description: 'Weekly Signals and simple explainers. Sources first. Clear actions next.'
}

export default async function HomePage() {
  const articles = await listArticles()
  const signals = (articles || []).filter((a: any) => a.access === 'premium')
  const latestSignal = signals[0] || articles[0]

  return (
    <div className="space-y-12">
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div className="prose dark:prose-invert">
          <h1 className="font-serif">AI, explained for everyday people.</h1>
          <p>What changed this week, why it matters, and what to try.</p>
          <div className="flex gap-3">
            <Link href="/login" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-brand text-black shadow hover:opacity-90">Join free</Link>
            {latestSignal && (
              <Link href={`/signals/${latestSignal.slug}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-md border">Read the latest Signal</Link>
            )}
          </div>
        </div>
        <div className="relative aspect-[16/9] w-full border rounded">
          <Image src="/sample/hero-2.svg" alt="Illustration representing weekly AI changes" fill className="object-cover rounded" />
        </div>
      </section>

      <section className="prose dark:prose-invert">
        <p>
          The Tech Pencil is an evidence‑first publication. We track the moving parts of AI—models, chips, data, energy, policy—and translate them into clear guidance. Dates are explicit. Numbers match sources. Claims are testable.
        </p>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1 rounded border p-5 bg-card">
          <h2 className="font-serif text-xl mb-2">Start here</h2>
          <p className="text-sm text-muted-foreground">New to AI? Read a short guide in plain English. Learn the terms, see examples, and try a small task.</p>
          <p className="mt-3"><Link href="/articles" className="underline">Read the explainer</Link></p>
        </div>
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-2 font-serif">This week’s Signals</h2>
          <p className="text-sm text-muted-foreground mb-4">Members get the evidence, charts, and the “so what.”</p>
          <ul className="divide-y">
            {(signals.length ? signals : articles).slice(0,4).map((a: any) => (
              <li key={a.id} className="py-3">
                <Link href={`/signals/${a.slug}`} className="font-serif hover:underline underline-offset-4">{a.title}</Link>
                {a.subhead && <p className="text-sm text-muted-foreground">{a.subhead}</p>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded border p-5 bg-muted/20">
        <p className="text-sm">Our <Link href="/methodology" className="underline">Methodology</Link> shows how we source, check, and correct.</p>
      </section>
    </div>
  )
}
