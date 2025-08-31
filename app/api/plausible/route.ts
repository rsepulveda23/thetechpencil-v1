import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  // Placeholder endpoint for client web-vitals forwarding if needed.
  const _payload = await req.json().catch(() => null)
  return NextResponse.json({ ok: true })
}

