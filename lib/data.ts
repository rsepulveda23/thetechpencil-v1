import { getServerSupabase } from '@/lib/supabase/server'
import { demoArticles, demoReports } from '@/lib/demo'

function supabaseReady() {
  if (process.env.DEMO_MODE === 'true') return false
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}

export async function listArticles() {
  if (!supabaseReady()) return demoArticles
  try {
    const supabase = getServerSupabase()
    const { data, error } = await supabase
      .from('article')
      .select('id, slug, title, subhead, body_md, hero_url, access, published_at')
      .order('published_at', { ascending: false })
      .limit(50)
    if (error) throw error
    return (data && data.length > 0) ? data : demoArticles
  } catch {
    return demoArticles
  }
}

export async function getArticleBySlug(slug: string) {
  if (!supabaseReady()) return demoArticles.find((a) => a.slug === slug) || null
  try {
    const supabase = getServerSupabase()
    const { data } = await supabase
      .from('article')
      .select('*')
      .eq('slug', slug)
      .maybeSingle()
    return data ?? (demoArticles.find((a) => a.slug === slug) ?? null)
  } catch {
    return demoArticles.find((a) => a.slug === slug) || null
  }
}

export async function listReports() {
  if (!supabaseReady()) return demoReports
  try {
    const supabase = getServerSupabase()
    const { data } = await supabase
      .from('report')
      .select('id, slug, title, summary, price_cents, published_at')
      .order('published_at', { ascending: false })
      .limit(50)
    return (data && data.length > 0) ? data : demoReports
  } catch {
    return demoReports
  }
}

export async function getReportBySlug(slug: string) {
  if (!supabaseReady()) return demoReports.find((r) => r.slug === slug) || null
  try {
    const supabase = getServerSupabase()
    const { data } = await supabase
      .from('report')
      .select('*')
      .eq('slug', slug)
      .maybeSingle()
    return data ?? (demoReports.find((r) => r.slug === slug) ?? null)
  } catch {
    return demoReports.find((r) => r.slug === slug) || null
  }
}
