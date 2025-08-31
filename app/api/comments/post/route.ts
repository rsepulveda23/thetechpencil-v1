import { NextResponse } from 'next/server'
import { getServerSupabase } from '@/lib/supabase/server'

export async function POST(req: Request) {
  const supabase = getServerSupabase()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  const { article_id, body } = await req.json()
  if (!article_id || !body) return NextResponse.json({ error: 'bad_request' }, { status: 400 })
  // Simple anti-abuse: max length is enforced in DB; rate limit could be added via edge/middleware + KV
  const { data, error } = await supabase.from('comment').insert({
    article_id,
    body,
    author_id: session.user.id,
  }).select('id, body, created_at').single()
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ comment: data })
}

