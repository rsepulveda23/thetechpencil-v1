import { requireAdmin } from '@/lib/auth'
import Link from 'next/link'

export default async function AdminSettings() {
  const ok = await requireAdmin()
  if (!ok) return <p>Unauthorized</p>
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 font-serif">Settings</h1>
      <p className="mb-4 text-sm text-muted-foreground">Site name, logo, OG defaults, legal text (stubs).</p>
      <Link className="underline mt-2 inline-block" href="/admin">Back</Link>
    </div>
  )
}
