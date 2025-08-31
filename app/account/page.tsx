import { redirect } from 'next/navigation'
import { getSession, getProfile } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export default async function AccountPage() {
  const session = await getSession()
  if (!session) redirect('/login')
  const profile = await getProfile()
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-serif">Account</h1>
      {process.env.DEMO_MODE === 'true' && (
        <p className="rounded border bg-muted/30 p-3 text-sm">Demo mode is enabled. This page shows mock data.</p>
      )}
      <div className="rounded border p-4">
        <p><strong>Email:</strong> {session.user.email}</p>
        <p><strong>Name:</strong> {profile?.display_name ?? '—'}</p>
        <p><a href="/logout" className="underline">Sign out</a></p>
      </div>
      <div className="rounded border p-4">
        <h2 className="font-semibold mb-2">Subscription</h2>
        {process.env.DEMO_MODE === 'true' ? (
          <a href="/checkout/success?demo=1&type=portal" className="px-3 py-1.5 rounded bg-foreground text-background inline-block">Manage subscription (demo)</a>
        ) : (
          <form action="/api/stripe/portal" method="post">
            <button className="px-3 py-1.5 rounded bg-foreground text-background">Open Customer Portal</button>
          </form>
        )}
        <p className="text-xs text-muted-foreground mt-2">Stripe is required for live subscriptions.</p>
      </div>
    </div>
  )
}
