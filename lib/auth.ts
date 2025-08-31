import { getServerSupabase } from '@/lib/supabase/server'

const DEMO = process.env.DEMO_MODE === 'true'

export async function getSession() {
  if (DEMO) {
    return { user: { id: 'demo-user', email: 'demo@example.com' } } as any
  }
  const supabase = getServerSupabase()
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session
}

export async function getProfile() {
  if (DEMO) {
    return { id: 'demo-user', display_name: 'Demo User', role: 'admin' } as any
  }
  const supabase = getServerSupabase()
  const session = await getSession()
  if (!session) return null
  const { data } = await supabase
    .from('profile')
    .select('*')
    .eq('id', session.user.id)
    .maybeSingle()
  return data
}

export async function requireAdmin() {
  if (DEMO) return true
  const profile = await getProfile()
  if (!profile || profile.role !== 'admin') {
    return false
  }
  return true
}
