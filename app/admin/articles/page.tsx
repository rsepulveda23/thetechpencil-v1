import { requireAdmin } from '@/lib/auth'
import { listArticles } from '@/lib/data'
import Link from 'next/link'

export default async function AdminArticles() {
  const ok = await requireAdmin()
  if (!ok) return <p>Unauthorized</p>
  const articles = await listArticles()
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 font-serif">Articles</h1>
      <p className="mb-4 text-sm text-muted-foreground">Create and manage articles. (Editing UI to be extended)</p>
      <ul className="divide-y">
        {articles.map((a: any) => (
          <li key={a.id} className="py-3 flex items-center justify-between">
            <div>
              <p className="font-medium">{a.title}</p>
              <p className="text-xs text-muted-foreground">/{a.slug} • {a.access}</p>
            </div>
            <a className="underline" href={`/articles/${a.slug}`} target="_blank">Preview</a>
          </li>
        ))}
      </ul>
      <Link className="underline mt-4 inline-block" href="/admin">Back</Link>
    </div>
  )
}
