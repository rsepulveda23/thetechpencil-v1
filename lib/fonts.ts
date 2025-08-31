import { Inter, Merriweather, Exo } from 'next/font/google'

export const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
export const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-serif',
})
export const exo = Exo({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-brand',
})
