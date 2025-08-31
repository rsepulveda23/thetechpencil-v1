import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getProfile } from '@/lib/auth'
import { getReportBySlug } from '@/lib/data'
import { formatDate } from '@/lib/format'

export const revalidate = 300

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const report: any = await getReportBySlug(params.slug)
  if (!report) return { title: 'Research — The Tech Pencil' }
  return {
    title: `${report.title} — The Tech Pencil`,
    description: report.summary || 'Evidence‑first reports with clear abstracts and takeaways.'
  }
}

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
          <p>Buy this report or get it with Membership. Instant online access and a downloadable PDF.</p>
          <div className="flex gap-3 mt-2">
            {demo ? (
              <>
                <a className="px-4 py-2 rounded bg-foreground text-background" href={`/checkout/success?demo=1&type=report&slug=${report.slug}`}>Buy this report</a>
                <Link className="px-4 py-2 rounded border" href="/pricing">Get with Membership</Link>
              </>
            ) : (
              <>
                <form action={`/api/checkout/report/${report.slug}`} method="post">
                  <button className="px-4 py-2 rounded bg-foreground text-background">Buy this report</button>
                </form>
                <Link className="px-4 py-2 rounded border" href="/pricing">Get with Membership</Link>
              </>
            )}
          </div>
          <p className="text-xs text-muted-foreground mt-2">You can also buy a single report without a plan.</p>
        </div>
      ) : (
        <div className="not-prose mt-6 p-4 border rounded">
          <p className="mb-3">You now have access. The report is available online and as a PDF in your Library.</p>
          <div className="flex gap-3">
            <a className="px-4 py-2 rounded border" href={`/api/reports/download/${report.id}`}>Download PDF</a>
            <Link className="px-4 py-2 rounded border" href="/account">Go to Library</Link>
          </div>
        </div>
      )}

      <h2>Abstract</h2>
      <p>{report.summary || 'A short summary in plain English. State the scope, the main claims, and the limits.'}</p>

      <h2>What’s inside</h2>
      <p>What you will learn in each section.</p>
    </article>
  )
}
