import { notFound } from 'next/navigation'
import { getProfile } from '@/lib/auth'
import { getReportBySlug } from '@/lib/data'
import { formatDate } from '@/lib/format'

export const revalidate = 300

export default async function ReportPage({ params }: { params: { slug: string } }) {
  const report: any = await getReportBySlug(params.slug)
  if (!report) return notFound()

  const profile = await getProfile()
  const gated = !profile
  const demo = process.env.DEMO_MODE === 'true' || !process.env.STRIPE_SECRET_KEY

  return (
    <article className="prose dark:prose-invert">
      <h1>{report.title}</h1>
      {report.summary && <p className="lead">{report.summary}</p>}
      <p className="not-prose text-sm text-muted-foreground mt-2">{formatDate(report.published_at)} • ${(report.price_cents/100).toFixed(2)}</p>
      {gated ? (
        <div className="not-prose mt-6 p-4 border rounded bg-muted/30">
          <p>Reports are for registered members. Create a free account, then purchase to download.</p>
          <a className="underline" href="/login">Register / Sign in</a>
        </div>
      ) : (
        <div className="not-prose mt-6 p-4 border rounded">
          {demo ? (
            <div className="flex gap-3">
              <a className="px-4 py-2 rounded bg-foreground text-background" href={`/checkout/success?demo=1&type=report&slug=${report.slug}`}>Buy report ${(report.price_cents/100).toFixed(2)}</a>
              <a className="px-4 py-2 rounded border" href={`/api/reports/download/${report.id}`}>Download (if purchased)</a>
            </div>
          ) : (
            <form action={`/api/checkout/report/${report.slug}`} method="post" className="flex gap-3">
              <button className="px-4 py-2 rounded bg-foreground text-background">Buy report ${(report.price_cents/100).toFixed(2)}</button>
              <a className="px-4 py-2 rounded border" href={`/api/reports/download/${report.id}`}>Download (if purchased)</a>
            </form>
          )}
        </div>
      )}
    </article>
  )
}
