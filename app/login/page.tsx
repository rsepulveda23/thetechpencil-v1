import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'

export const dynamic = 'force-dynamic'

export default async function LoginPage() {
  const session = await getSession()
  if (session) {
    redirect('/account')
  }
  return (
    <div className="max-w-md">
      <h1 className="text-2xl font-bold mb-4">Sign in / Register</h1>
      {process.env.DEMO_MODE === 'true' && (
        <p className="mb-3 rounded border bg-muted/30 p-3 text-sm">Demo mode is enabled. Submitting this form will take you to a mock account page.</p>
      )}
      <p className="text-sm text-muted-foreground mb-4">We use passwordless magic links. Enter your email and check your inbox.</p>
      <form className="space-y-3" action={sendMagicLink}>
        <label className="block">
          <span className="text-sm">Email</span>
          <input type="email" name="email" required className="mt-1 w-full border rounded px-3 py-2" />
        </label>
        <button type="submit" className="px-4 py-2 rounded bg-foreground text-background">Send magic link</button>
      </form>
    </div>
  )
}

async function sendMagicLink(formData: FormData) {
  'use server'
  const email = String(formData.get('email') || '')
  if (process.env.DEMO_MODE === 'true') {
    redirect('/account?demo=1')
  }
  const { getServerSupabase } = await import('@/lib/supabase/server')
  const supabase = getServerSupabase()
  await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/account` } })
}
