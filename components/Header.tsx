"use client"
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import BrandWordmark from '@/components/BrandWordmark'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        scrolled && 'shadow-sm'
      )}
      role="banner"
    >
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-semibold" aria-label="The Tech Pencil home">
            <BrandWordmark />
          </Link>
          <nav aria-label="Main" className="hidden md:flex gap-5 text-sm text-muted-foreground">
            <Link href="/" className="hover:underline hover:text-foreground underline-offset-4">Home</Link>
            <Link href="/articles" className="hover:underline hover:text-foreground underline-offset-4">Blog</Link>
            <Link href="/signals" className="hover:underline hover:text-foreground underline-offset-4">Signals</Link>
            <Link href="/research" className="hover:underline hover:text-foreground underline-offset-4">Research</Link>
            <Link href="/clinic" className="hover:underline hover:text-foreground underline-offset-4">Clinic</Link>
            <Link href="/community" className="hover:underline hover:text-foreground underline-offset-4">Community</Link>
            <Link href="/methodology" className="hover:underline hover:text-foreground underline-offset-4">Methodology</Link>
            <Link href="/about" className="hover:underline hover:text-foreground underline-offset-4">About</Link>
            <Link href="/pricing" className="hover:underline hover:text-foreground underline-offset-4">Join</Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="hidden sm:inline text-sm text-muted-foreground hover:text-foreground">Sign in</Link>
          <Link href="/login" className="px-3 py-1.5 rounded-md bg-brand text-white text-sm shadow hover:opacity-90">Join free</Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

function ThemeToggle() {
  const [dark, setDark] = useState(false)
  useEffect(() => {
    const stored = localStorage.getItem('ttp-theme')
    if (stored) setDark(stored === 'dark')
  }, [])
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('ttp-theme', dark ? 'dark' : 'light')
  }, [dark])
  return (
    <button
      type="button"
      aria-label="Toggle theme"
      className="h-9 w-9 rounded-md border flex items-center justify-center"
      onClick={() => setDark((d) => !d)}
    >
      {dark ? '🌙' : '☀️'}
    </button>
  )
}
