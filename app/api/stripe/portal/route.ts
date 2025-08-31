import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getServerSupabase } from '@/lib/supabase/server'

export async function POST() {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: 'stripe_not_configured' }, { status: 400 })
  }
  const supabase = getServerSupabase()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const { data: sub } = await supabase
    .from('subscription')
    .select('stripe_customer_id')
    .eq('user_id', session.user.id)
    .maybeSingle()
  if (!sub?.stripe_customer_id) return NextResponse.json({ error: 'no_customer' }, { status: 400 })

  const p = await stripe.billingPortal.sessions.create({
    customer: sub.stripe_customer_id,
    return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/account`,
  })
  return NextResponse.redirect(p.url, { status: 303 })
}

