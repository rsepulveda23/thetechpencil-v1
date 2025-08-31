import { createClient } from '@supabase/supabase-js'

async function main() {
  const email = process.argv[2]
  if (!email) {
    console.error('Usage: ts-node scripts/promote-admin.ts user@example.com')
    process.exit(1)
  }
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!
  const supabase = createClient(url, key)
  const { data, error } = await supabase.from('profile').update({ role: 'admin' }).eq('email', email).select('id').maybeSingle()
  if (error) throw error
  console.log('Promoted', email, '-> admin', data)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})

