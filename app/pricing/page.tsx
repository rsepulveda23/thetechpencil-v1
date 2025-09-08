export default function PricingPage() {
  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert">
        <h1 className="font-serif">Join TheTechPencil</h1>
        <p>Create a free account to comment, save posts, and get the weekly email.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border p-6 bg-card shadow-sm">
          <h3 className="font-semibold">Free</h3>
          <p className="text-sm text-muted-foreground mb-4">Create a free account to comment, save posts, and get the weekly email.</p>
          <p className="text-2xl font-bold mb-4">$0</p>
          <a href="/login" className="px-4 py-2 rounded border inline-block hover:bg-brand/10">Join free</a>
        </div>
        <div className="rounded-lg border p-6 bg-card ring-1 ring-foreground/10 shadow-sm">
          <h3 className="font-semibold">Member</h3>
          <p className="text-sm text-muted-foreground mb-4">Get most Research and downloads. Two‑minute sign‑up. Cancel anytime.</p>
          <p className="text-2xl font-bold mb-4">$10<span className="text-base font-normal">/mo</span></p>
          <div>
            <PricingCTA />
          </div>
        </div>
        <div className="rounded-lg border p-6 bg-card shadow-sm">
          <h3 className="font-semibold">Annual</h3>
          <p className="text-sm text-muted-foreground mb-4">2 months free compared to monthly.</p>
          <p className="text-2xl font-bold mb-4">$100<span className="text-base font-normal">/yr</span></p>
          <a href="/checkout/success?demo=1&type=subscription-annual" className="px-4 py-2 rounded bg-brand text-white hover:brightness-110 active:brightness-100 active:translate-y-px inline-block">Upgrade to Membership</a>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">FAQ: what is included, how to cancel, and how we handle refunds.</p>
    </div>
  )
}

import PricingCTA from '../(public)/pricing-client'
