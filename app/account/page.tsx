import { redirect } from 'next/navigation'
import { getSession, getProfile } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export default async function AccountPage() {
  const session = await getSession()
  if (!session) redirect('/login')
  const profile = await getProfile()
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold font-serif">Your account</h1>
      {process.env.DEMO_MODE === 'true' && (
        <p className="rounded border bg-muted/30 p-3 text-sm">Demo mode is enabled. This page shows mock data.</p>
      )}
      <section className="rounded-lg border p-4 shadow-sm">
        <h2 className="font-semibold mb-2">Profile</h2>
        <p><strong>Email:</strong> {session.user.email}</p>
        <p><strong>Name:</strong> {profile?.display_name ?? '—'}</p>
        <p className="mt-2"><a href="/logout" className="underline">Sign out</a></p>
      </section>
      <section className="rounded-lg border p-4 shadow-sm">
        <h2 className="font-semibold mb-2">Saved</h2>
        <p className="text-sm text-muted-foreground">No saved items yet.</p>
      </section>
      <section className="rounded-lg border p-4 shadow-sm">
        <h2 className="font-semibold mb-2">Billing</h2>
        {process.env.DEMO_MODE === 'true' ? (
          <a href="/checkout/success?demo=1&type=portal" className="px-3 py-1.5 rounded bg-brand text-white hover:brightness-110 active:brightness-100 active:translate-y-px inline-block">Manage billing</a>
        ) : (
          <form action="/api/stripe/portal" method="post">
            <button className="px-3 py-1.5 rounded bg-brand text-white hover:brightness-110 active:brightness-100 active:translate-y-px">Manage billing</button>
          </form>
        )}
        <p className="text-xs text-muted-foreground mt-2">You can cancel anytime. Access continues until the end of the period.</p>
      </section>
    </div>
  )
}
