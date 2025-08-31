import { NextResponse } from 'next/server'
import { stripe, STRIPE_PRICES } from '@/lib/stripe'

export async function POST() {
  if (!process.env.STRIPE_SECRET_KEY) return NextResponse.json({ error: 'stripe_not_configured' }, { status: 400 })
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: STRIPE_PRICES.monthly, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/account`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,
  })
  return NextResponse.json({ url: session.url })
}

