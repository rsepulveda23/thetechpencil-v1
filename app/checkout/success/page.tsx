export const dynamic = 'force-dynamic'

export default function CheckoutSuccess() {
  return (
    <div className="max-w-lg space-y-4">
      <h1 className="text-2xl font-bold">Checkout complete</h1>
      <p className="text-muted-foreground">Thanks for supporting the research. In demo mode this simulates a successful checkout.</p>
      <div className="flex gap-3">
        <a href="/account" className="px-4 py-2 rounded bg-foreground text-background">Go to account</a>
        <a href="/articles" className="px-4 py-2 rounded border">Browse articles</a>
      </div>
    </div>
  )
}

