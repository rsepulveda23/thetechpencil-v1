import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getSession, getProfile } from '@/lib/auth'
import { getArticleBySlug } from '@/lib/data'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { readingTime, formatDate } from '@/lib/format'

export const revalidate = 120

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article: any = await getArticleBySlug(params.slug)

  if (!article) return notFound()

  const session = await getSession()
  const profile = await getProfile()

  const isPremium = article.access === 'premium'
  const registered = Boolean(profile)

  let body = article.body_md
  let gated = false

  if (!registered) {
    // Hard registration gate: show only first paragraph
    const firstPara = article.body_md.split(/\n\n+/)[0]
    body = firstPara
    gated = true
  }

  if (isPremium && (!session || !profile)) {
    gated = true
  }

  return (
    <article className="prose prose-lg dark:prose-invert">
      <h1>{article.title}</h1>
      {article.subhead && <p className="lead">{article.subhead}</p>}
      <p className="not-prose text-sm text-muted-foreground mt-2">
        {formatDate(article.published_at)}
        {article.body_md && <> • {readingTime(article.body_md).label}</>}
        {isPremium && <span className="ml-2 inline-block align-middle text-xs rounded px-2 py-0.5 bg-brand/20 text-black">Premium</span>}
      </p>
      {article.hero_url && (
        <div className="relative w-full aspect-[16/9] rounded border overflow-hidden not-prose my-4">
          <Image src={article.hero_url} alt="" fill className="object-cover" />
        </div>
      )}
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
      {gated && (
        <div className="not-prose mt-6 p-4 border rounded bg-muted/30">
          {!registered ? (
            <div>
              <p className="mb-3">Create a free account to keep reading and join the discussion.</p>
              <a className="underline" href="/login">Register / Sign in</a>
            </div>
          ) : (
            <div>
              <p className="mb-3">This is a premium article. Subscribe to unlock full access.</p>
              <a className="underline" href="/pricing">See pricing</a>
            </div>
          )}
        </div>
      )}
      {!gated && (
        <section className="not-prose mt-10">
          <h2 className="text-lg font-semibold mb-3">Comments</h2>
          <CommentForm articleId={article.id} />
          <Comments articleId={article.id} />
        </section>
      )}
    </article>
  )
}

async function Comments({ articleId }: { articleId: string }) {
  // Demo mode: just render a couple of sample comments when DB not present
  const comments = [
    { id: 'c1', body: 'Love this breakdown — clear and sourced!', created_at: new Date().toISOString() },
    { id: 'c2', body: 'Would be great to see the model sheet.', created_at: new Date().toISOString() },
  ]
  return (
    <ul className="space-y-4">
      {comments.map((c) => (
        <li key={c.id} className="border rounded p-3">
          <p className="text-sm mb-2">{c.body}</p>
          <p className="text-xs text-muted-foreground">{new Date(c.created_at).toLocaleString()}</p>
        </li>
      ))}
    </ul>
  )
}

function CommentForm({ articleId }: { articleId: string }) {
  return (
    <form className="mb-4" action={`/api/comments/post`} method="post" suppressHydrationWarning>
      <input type="hidden" name="article_id" value={articleId} />
      <textarea name="body" required maxLength={2000} className="w-full border rounded p-2" placeholder="Add a thoughtful comment" />
      <button formAction={postComment} className="mt-2 px-3 py-1.5 rounded bg-foreground text-background">Post</button>
    </form>
  )
}

async function postComment(formData: FormData) {
  'use server'
  const article_id = String(formData.get('article_id'))
  const body = String(formData.get('body'))
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/comments/post`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ article_id, body }),
  })
  if (!res.ok) throw new Error('Failed to post comment')
}
