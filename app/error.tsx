"use client"
import { useEffect } from 'react'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Optionally log error
    console.error(error)
  }, [error])
  return (
    <div className="min-h-[40vh] grid place-items-center">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold">Something went wrong</h1>
        <p className="text-muted-foreground">Please refresh. If it keeps happening, contact support@thetechpencil.com</p>
        <button onClick={reset} className="px-4 py-2 rounded bg-foreground text-background">Try again</button>
      </div>
    </div>
  )
}

