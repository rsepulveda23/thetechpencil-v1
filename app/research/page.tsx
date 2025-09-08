import Link from 'next/link'
import type { Metadata } from 'next'
import { listReports } from '@/lib/data'
import { formatDate } from '@/lib/format'

export const revalidate = 120

export const metadata: Metadata = {
  title: 'Research — TheTechPencil',
  description: 'Evidence‑first reports. Clear abstracts, sources, and practical takeaways.'
}

export default async function ResearchIndex() {
  const data = await listReports()

  return (
    <div>
      <div className="prose dark:prose-invert">
        <h1 className="font-serif">Research</h1>
        <p>Deeper briefs and reports for readers who want the full picture. Read online or download. Buy one report or get access with Membership.</p>
      </div>
      <ul className="divide-y">
        {data?.map((r: any) => (
          <li key={r.id} className="py-4">
            <Link href={`/research/${r.slug}`} className="text-lg font-serif hover:underline underline-offset-4">{r.title}</Link>
            <p className="text-sm text-muted-foreground">{r.summary}</p>
            <p className="text-xs text-muted-foreground mt-1">{formatDate(r.published_at)} • ${(r.price_cents/100).toFixed(2)}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
