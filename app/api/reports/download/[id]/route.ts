import { NextResponse } from 'next/server'
import { getServerSupabase } from '@/lib/supabase/server'

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const supabase = getServerSupabase()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const { data: purchase } = await supabase
    .from('purchase')
    .select('report_id')
    .eq('buyer_id', session.user.id)
    .eq('report_id', params.id)
    .maybeSingle()
  if (!purchase) return NextResponse.json({ error: 'forbidden' }, { status: 403 })

  const { data: report } = await supabase
    .from('report')
    .select('file_path')
    .eq('id', params.id)
    .maybeSingle()
  if (!report) return NextResponse.json({ error: 'not_found' }, { status: 404 })

  const { data: signed, error } = await supabase.storage
    .from('reports-private')
    .createSignedUrl(report.file_path as string, 60)
  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.redirect(signed.signedUrl)
}
