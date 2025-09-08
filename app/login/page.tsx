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
      <h1 className="text-2xl font-bold mb-1">Welcome back</h1>
      <p className="text-sm text-muted-foreground mb-1">Sign in to continue.</p>
      <p className="text-sm text-muted-foreground mb-4">Create a free account to get started.</p>
      {process.env.DEMO_MODE === 'true' && (
        <p className="mb-3 rounded border bg-muted/30 p-3 text-sm">Demo mode is enabled. Submitting this form will take you to a mock account page.</p>
      )}
      <p className="text-sm text-muted-foreground mb-4">We use passwordless magic links. Enter your email and check your inbox.</p>
      <form className="space-y-3" action={sendMagicLink}>
        <label className="block">
          <span className="text-sm">Email</span>
          <input type="email" name="email" required className="mt-1 w-full border rounded px-3 py-2" />
        </label>
        <button type="submit" className="px-4 py-2 rounded bg-brand text-white hover:brightness-110 active:brightness-100 active:translate-y-px">Send magic link</button>
      </form>
      <p className="text-xs text-muted-foreground mt-3">Forgot your password? Use the magic link to sign in.</p>
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
