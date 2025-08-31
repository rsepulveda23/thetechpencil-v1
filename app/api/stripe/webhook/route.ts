import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'
import { getServerSupabase } from '@/lib/supabase/server'

export async function POST(req: Request) {
  const sig = headers().get('stripe-signature')
  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) return new Response('missing signature', { status: 400 })
  const body = await req.text()
  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET)
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }

  const supabase = getServerSupabase()

  switch (event.type) {
    case 'checkout.session.completed': {
      const session: any = event.data.object
      const mode = session.mode
      if (mode === 'payment') {
        // One-off report purchase
        const report_id = session.metadata?.report_id
        const user_id = session.metadata?.user_id
        if (report_id && user_id) {
          await supabase.from('purchase').insert({ report_id, buyer_id: user_id, stripe_payment_intent: session.payment_intent })
        }
      }
      break
    }
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted': {
      const sub: any = event.data.object
      const user_id = sub.metadata?.user_id
      if (user_id) {
        const status = sub.status === 'canceled' || sub.status === 'unpaid' ? 'inactive' : 'active'
        await supabase.from('subscription').upsert({
          user_id,
          stripe_customer_id: sub.customer as string,
          stripe_subscription_id: sub.id as string,
          status,
          current_period_end: new Date((sub.current_period_end as number) * 1000).toISOString(),
        }, { onConflict: 'user_id' })
      }
      break
    }
    default:
      break
  }

  return NextResponse.json({ received: true })
}

export const dynamic = 'force-dynamic'

