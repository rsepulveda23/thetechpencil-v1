"use client"
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function PageFade({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [key, setKey] = useState(0)
  useEffect(() => {
    // bump key to trigger fade-in on route change
    setKey((k) => k + 1)
  }, [pathname])
  return (
    <div key={key} className="opacity-0 animate-[fadeIn_140ms_ease-out_forwards] motion-reduce:animate-none">
      {children}
    </div>
  )
}
