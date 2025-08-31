import { requireAdmin } from '@/lib/auth'
import Link from 'next/link'

export default async function AdminComments() {
  const ok = await requireAdmin()
  if (!ok) return <p>Unauthorized</p>
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 font-serif">Comments Moderation</h1>
      <p className="mb-4 text-sm text-muted-foreground">Moderation queue and actions (hide/delete/ban) to be implemented.</p>
      <Link className="underline mt-2 inline-block" href="/admin">Back</Link>
    </div>
  )
}
