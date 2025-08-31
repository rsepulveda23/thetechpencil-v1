import './globals.css'
import type { Metadata } from 'next'
import Plausible from './plausible'
import SkipLink from '@/components/SkipLink'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { inter, merriweather, exo } from '@/lib/fonts'

export const metadata: Metadata = {
  title: 'The Tech Pencil',
  description: 'Plain‑English AI guidance with sources. Evidence, odds, and what would change our mind.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${merriweather.variable} ${exo.variable}`}>
      <body className="font-sans">
        <SkipLink />
        <Header />
        <main id="main" className="container min-h-[60vh] py-12">{children}</main>
        <Footer />
        <Plausible />
      </body>
    </html>
  )
}
