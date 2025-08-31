import { NextResponse } from 'next/server'
import { getServerSupabase } from '@/lib/supabase/server'

export async function GET() {
  const supabase = getServerSupabase()
  await supabase.auth.signOut()
  return NextResponse.redirect(new URL('/', process.env.NEXT_PUBLIC_SITE_URL))
}

