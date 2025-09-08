import Link from 'next/link'
import { FileText, BookOpen, Users } from 'lucide-react'

export default function HomeTiles() {
  const items = [
    { href: '/articles' as const, title: 'Blog', desc: 'Explainers and how‑tos.', Icon: FileText },
    { href: '/research' as const, title: 'Research', desc: 'Evidence‑first reports.', Icon: BookOpen },
    { href: '/community' as const, title: 'Community', desc: 'Ask, share sources.', Icon: Users },
  ]
  return (
    <div className="grid sm:grid-cols-3 gap-4 not-prose">
      {items.map(({ href, title, desc, Icon }) => (
        <Link key={href} href={href} className="group rounded-xl border bg-card p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center justify-center rounded-md size-9 bg-brand/10 text-brand">
              <Icon className="size-5" aria-hidden />
            </span>
            <span className="font-semibold group-hover:text-foreground link-underline">{title}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-2">{desc}</p>
        </Link>
      ))}
    </div>
  )
}
