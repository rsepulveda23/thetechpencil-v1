import Link from 'next/link'
import type { Metadata } from 'next'
import { listArticles } from '@/lib/data'
import { formatDate } from '@/lib/format'

export const revalidate = 120

export const metadata: Metadata = {
  title: 'Signals — The Tech Pencil',
  description: 'Weekly Signals with sources, evidence, and clear implications.'
}

export default async function SignalsIndex() {
  const articles = await listArticles()
  const signals = (articles || []).filter((a: any) => a.access === 'premium')

  return (
    <div>
      <div className="prose dark:prose-invert">
        <h1 className="font-serif">Signals</h1>
        <p>Weekly read on what moved in AI. Each Signal names the change, shows the evidence, and ends with a clear “so what.” Previews are free. Members see full details.</p>
      </div>
      {(!signals || signals.length === 0) && (
        <p className="mt-6 text-sm text-muted-foreground">No Signals yet. Check back tomorrow or join free for the weekly email.</p>
      )}
      <ul className="divide-y mt-4">
        {(signals.length ? signals : articles).map((a: any) => (
          <li key={a.id} className="py-4">
            <Link href={`/signals/${a.slug}`} className="font-serif text-lg hover:underline underline-offset-4">{a.title}</Link>
            {a.subhead && <p className="text-sm text-muted-foreground">{a.subhead}</p>}
            <p className="text-xs text-muted-foreground mt-1">{formatDate(a.published_at)}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

