import { requireAdmin } from '@/lib/auth'
import { listReports } from '@/lib/data'
import Link from 'next/link'

export default async function AdminReports() {
  const ok = await requireAdmin()
  if (!ok) return <p>Unauthorized</p>
  const reports = await listReports()
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 font-serif">Reports</h1>
      <p className="mb-4 text-sm text-muted-foreground">Upload PDFs to private bucket and manage pricing. (UI stub)</p>
      <ul className="divide-y">
        {reports.map((r: any) => (
          <li key={r.id} className="py-3 flex items-center justify-between">
            <div>
              <p className="font-medium">{r.title}</p>
              <p className="text-xs text-muted-foreground">/${r.slug} • ${(r.price_cents/100).toFixed(2)}</p>
            </div>
            <a className="underline" href={`/research/${r.slug}`} target="_blank">Preview</a>
          </li>
        ))}
      </ul>
      <Link className="underline mt-4 inline-block" href="/admin">Back</Link>
    </div>
  )
}
