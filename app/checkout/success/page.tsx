export const dynamic = 'force-dynamic'

export default function CheckoutSuccess() {
  return (
    <div className="max-w-lg space-y-4">
      <h1 className="text-2xl font-bold">You’re in. Full access unlocked.</h1>
      <p className="text-muted-foreground">Thanks for supporting TheTechPencil. In demo mode this simulates a successful checkout.</p>
      <div className="flex gap-3">
        <a href="/account" className="px-4 py-2 rounded bg-brand text-white hover:brightness-110 active:brightness-100 active:translate-y-px">Go to account</a>
        <a href="/articles" className="px-4 py-2 rounded border">Read the Blog</a>
      </div>
    </div>
  )
}
