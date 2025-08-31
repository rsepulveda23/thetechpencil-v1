import Link from 'next/link'
import { listReports } from '@/lib/data'
import { formatDate } from '@/lib/format'

export const revalidate = 120

export default async function ResearchIndex() {
  const data = await listReports()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 font-serif">Research</h1>
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
