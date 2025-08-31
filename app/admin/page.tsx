import { requireAdmin } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export default async function AdminHome() {
  const ok = await requireAdmin()
  if (!ok) return <p>Unauthorized</p>
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-serif">Admin</h1>
      <ul className="grid gap-4 sm:grid-cols-2">
        <li className="border rounded p-4"><a className="hover:underline" href="/admin/articles">Articles</a></li>
        <li className="border rounded p-4"><a className="hover:underline" href="/admin/reports">Reports</a></li>
        <li className="border rounded p-4"><a className="hover:underline" href="/admin/comments">Comments</a></li>
        <li className="border rounded p-4"><a className="hover:underline" href="/admin/orders">Orders & Subscriptions</a></li>
        <li className="border rounded p-4"><a className="hover:underline" href="/admin/newsletter">Newsletter</a></li>
        <li className="border rounded p-4"><a className="hover:underline" href="/admin/settings">Settings</a></li>
      </ul>
    </div>
  )
}
