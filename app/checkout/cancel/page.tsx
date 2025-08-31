export const dynamic = 'force-dynamic'

export default function CheckoutCancel() {
  return (
    <div className="max-w-lg space-y-4">
      <h1 className="text-2xl font-bold">Checkout canceled</h1>
      <p className="text-muted-foreground">No worries — you can try again any time. In demo mode this page simulates a canceled checkout.</p>
      <div className="flex gap-3">
        <a href="/pricing" className="px-4 py-2 rounded bg-foreground text-background">Back to pricing</a>
        <a href="/research" className="px-4 py-2 rounded border">View research</a>
      </div>
    </div>
  )
}

