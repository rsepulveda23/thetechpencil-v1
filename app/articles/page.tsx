import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { listArticles } from '@/lib/data'
import { formatDate, readingTime } from '@/lib/format'

export const revalidate = 120

export const metadata: Metadata = {
  title: 'Blog — TheTechPencil',
  description: 'Plain‑English explainers and how‑tos with sources and clear steps.'
}

export default async function ArticlesIndex() {
  const data = await listArticles()

  return (
    <div>
      <div className="prose dark:prose-invert">
        <h1 className="font-serif">Blog</h1>
        <p>Short explainers and Everyday AI how‑tos. Read a post in a few minutes, then try the steps. All posts link to sources and show dates.</p>
      </div>
      {(!data || data.length === 0) && (
        <p className="mt-6 text-sm text-muted-foreground">No posts yet. Check back tomorrow or join free for the weekly email.</p>
      )}
      <ul className="divide-y">
        {data?.map((a: any) => (
          <li key={a.id} className="py-5 flex gap-5 items-start">
            {a.hero_url && (
              <div className="relative w-[180px] shrink-0 aspect-[16/9] rounded overflow-hidden border">
                <Image src={a.hero_url} alt="" fill className="object-cover" />
              </div>
            )}
            <div className="min-w-0">
              <Link href={`/articles/${a.slug}`} className="font-serif text-xl hover:underline underline-offset-4">{a.title}</Link>
              <p className="text-sm text-muted-foreground mt-1">{a.subhead}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatDate(a.published_at)} • {readingTime(a.body_md).label}
              </p>
              {a.access === 'premium' && (
                <span className="inline-block mt-2 text-xs rounded px-2 py-0.5 bg-brand/20 text-black">Member</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
