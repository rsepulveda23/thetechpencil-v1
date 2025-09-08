"use client"
import { useState } from 'react'

export default function PricingCTA() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const start = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/checkout/subscription', { method: 'POST' })
      if (!res.ok) {
        // Demo fallback if Stripe not configured
        window.location.href = '/checkout/success?demo=1&type=subscription'
        return
      }
      const { url } = await res.json()
      if (url) window.location.href = url
    } catch (e) {
      setError('Checkout is unavailable right now.')
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={start}
        disabled={loading}
        className="px-5 py-2.5 rounded-md bg-brand text-white shadow hover:brightness-110 active:brightness-100 active:translate-y-px disabled:opacity-60 transition"
      >
        {loading ? 'Starting…' : 'Upgrade to Membership'}
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
}
