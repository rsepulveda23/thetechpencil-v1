import Link from 'next/link'
import Image from 'next/image'
import { listArticles } from '@/lib/data'

export const revalidate = 60

export default async function HomePage() {
  const articles = await listArticles()

  return (
    <div className="space-y-12">
      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div className="prose dark:prose-invert">
          <h1 className="font-serif">TheTechPencil</h1>
          <p>Evidence-first tech analysis and research. Join free to read full articles and participate in thoughtful discussions.</p>
          <p>
            <Link href="/pricing" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-brand text-black shadow hover:opacity-90">Get started</Link>
          </p>
        </div>
        <div className="relative aspect-[16/9] w-full border rounded">
          <Image src="/sample/hero-2.svg" alt="Tech analysis" fill className="object-cover rounded" />
        </div>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-4 font-serif">Latest Articles</h2>
        <ul className="divide-y">
          {articles?.map((a: any) => (
            <li key={a.id} className="py-4">
              <Link href={`/articles/${a.slug}`} className="font-serif text-lg hover:underline underline-offset-4">{a.title}</Link>
              <p className="text-sm text-muted-foreground">{a.subhead}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
