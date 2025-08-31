export default function PricingPage() {
  return (
    <div className="space-y-8">
      <div className="prose dark:prose-invert">
        <h1>Pricing</h1>
        <p>Support our research and unlock premium content.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border p-6 bg-card">
          <h3 className="font-semibold">Free</h3>
          <p className="text-sm text-muted-foreground mb-4">Read full free articles and comment.</p>
          <p className="text-2xl font-bold mb-4">$0</p>
          <a href="/login" className="px-4 py-2 rounded border inline-block">Create free account</a>
        </div>
        <div className="rounded-lg border p-6 bg-card ring-1 ring-foreground/10">
          <h3 className="font-semibold">Member</h3>
          <p className="text-sm text-muted-foreground mb-4">All premium articles.</p>
          <p className="text-2xl font-bold mb-4">$10<span className="text-base font-normal">/mo</span></p>
          <div>
            <PricingCTA />
          </div>
        </div>
        <div className="rounded-lg border p-6 bg-card">
          <h3 className="font-semibold">Annual</h3>
          <p className="text-sm text-muted-foreground mb-4">2 months free compared to monthly.</p>
          <p className="text-2xl font-bold mb-4">$100<span className="text-base font-normal">/yr</span></p>
          <a href="/checkout/success?demo=1&type=subscription-annual" className="px-4 py-2 rounded bg-foreground text-background inline-block">Choose annual</a>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">Stripe checkout is required for live payments. In demo mode, buttons simulate the flow.</p>
    </div>
  )
}

import PricingCTA from '../(public)/pricing-client'
