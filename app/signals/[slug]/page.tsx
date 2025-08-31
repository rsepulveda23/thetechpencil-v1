import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { getArticleBySlug } from '@/lib/data'
import { getSession, getProfile } from '@/lib/auth'
import { formatDate } from '@/lib/format'

export const revalidate = 120

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article: any = await getArticleBySlug(params.slug)
  if (!article) return { title: 'Signal — The Tech Pencil' }
  return {
    title: `${article.title} — The Tech Pencil`,
    description: article.subhead || 'Weekly Signals with sources and clear implications.'
  }
}

export default async function SignalPage({ params }: { params: { slug: string } }) {
  const article: any = await getArticleBySlug(params.slug)
  if (!article) return notFound()

  const session = await getSession()
  const profile = await getProfile()

  const isPremium = article.access === 'premium'
  const registered = Boolean(profile)

  let previewBody = article.body_md
  const paras = article.body_md.split(/\n\n+/)
  if (paras.length > 2) previewBody = paras.slice(0, 2).join('\n\n')

  const gated = !registered || (isPremium && (!session || !profile))

  return (
    <article className="prose prose-lg dark:prose-invert">
      <h1>{article.title}</h1>
      {article.subhead && <p className="lead">{article.subhead}</p>}
      <p className="not-prose text-sm text-muted-foreground mt-2">Published {formatDate(article.published_at)}. Sources at the end.</p>

      <section>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{previewBody}</ReactMarkdown>
      </section>

      {gated ? (
        <div className="not-prose mt-6 p-4 border rounded bg-muted/30">
          <p className="mb-3">Members get the evidence, charts, and the “so what.” Join in two minutes.</p>
          <div className="flex gap-3">
            <Link href="/pricing" className="px-4 py-2 rounded bg-foreground text-background">Unlock full Signal</Link>
            <Link href="/login" className="px-4 py-2 rounded border">Join free</Link>
          </div>
        </div>
      ) : (
        <>
          <h2>Evidence and mechanics</h2>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.body_md}</ReactMarkdown>
          <h2>So what</h2>
          <p>We spell out likely impacts in plain language. Note the conditions that would change the view.</p>
          <h3>Sources</h3>
          <p>Link to primary documents first. Quote carefully.</p>
        </>
      )}
    </article>
  )
}

