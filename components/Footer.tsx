export default function Footer() {
  return (
    <footer className="border-t mt-12" role="contentinfo">
      <div className="container py-8 text-sm text-muted-foreground flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p>
          © <span className="font-brand font-medium text-foreground">TheTechPencil</span>. Plain‑English AI guidance. No hype.{' '}
          <a href="mailto:support@thetechpencil.com" className="underline">Contact: support@thetechpencil.com</a>
        </p>
        <nav aria-label="Legal" className="flex gap-4">
          <a href="/legal/tos" className="hover:underline">Terms</a>
          <a href="/legal/privacy" className="hover:underline">Privacy</a>
          <a href="/legal/refunds" className="hover:underline">Refunds</a>
          <a href="/legal/disclaimer" className="hover:underline">Disclaimer</a>
        </nav>
      </div>
      <div className="container pb-6 text-xs text-muted-foreground">
        <p>Educational content only. Not financial advice.</p>
      </div>
    </footer>
  )
}
