import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { getServerSupabase } from '@/lib/supabase/server'

export async function POST(_: Request, { params }: { params: { slug: string } }) {
  if (!process.env.STRIPE_SECRET_KEY) return NextResponse.json({ error: 'stripe_not_configured' }, { status: 400 })
  const supabase = getServerSupabase()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const { data: report } = await supabase.from('report').select('id, title, price_cents').eq('slug', params.slug).maybeSingle()
  if (!report) return NextResponse.json({ error: 'not_found' }, { status: 404 })
  const checkout = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{
      price_data: {
        currency: 'usd',
        unit_amount: report.price_cents,
        product_data: { name: report.title },
      },
      quantity: 1,
    }],
    metadata: { report_id: report.id, user_id: session.user.id },
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/account`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/research/${params.slug}`,
  })
  return NextResponse.json({ url: checkout.url })
}

