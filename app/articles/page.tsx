import Link from 'next/link'
import Image from 'next/image'
import { listArticles } from '@/lib/data'
import { formatDate, readingTime } from '@/lib/format'

export const revalidate = 120

export default async function ArticlesIndex() {
  const data = await listArticles()

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 font-serif">Articles</h1>
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
                <span className="inline-block mt-2 text-xs rounded px-2 py-0.5 bg-brand/20 text-black">Premium</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
