import { redirect } from 'next/navigation'
import { getProfile } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export default async function AskPage() {
  const profile = await getProfile()
  if (!profile) {
    redirect('/login')
  }
  return (
    <div className="prose dark:prose-invert max-w-2xl">
      <h1 className="font-serif">Ask Tech Pencil</h1>
      <p>Members can ask questions and get answers drawn from our published posts. Each answer links to sources. If we cannot answer, we file a request for a new post.</p>
      <p className="text-sm text-muted-foreground">Ten questions per day at launch. Educational use only.</p>
      <form className="not-prose mt-4 space-y-3">
        <label className="block">
          <span className="text-sm">Your question</span>
          <textarea className="mt-1 w-full border rounded p-2" rows={4} placeholder="Ask a clear, specific question" />
        </label>
        <button type="button" className="px-4 py-2 rounded bg-foreground text-background">Ask Tech Pencil</button>
      </form>
    </div>
  )
}

