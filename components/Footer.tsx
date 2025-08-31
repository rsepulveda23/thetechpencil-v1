export default function Footer() {
  return (
    <footer className="border-t mt-12" role="contentinfo">
      <div className="container py-8 text-sm text-muted-foreground flex flex-wrap gap-4 justify-between">
        <p>© {new Date().getFullYear()} <span className="font-brand font-medium text-foreground">TheTechPencil</span></p>
        <nav aria-label="Legal" className="flex gap-4">
          <a href="/legal/tos" className="hover:underline">Terms</a>
          <a href="/legal/privacy" className="hover:underline">Privacy</a>
          <a href="/legal/refunds" className="hover:underline">Refunds</a>
          <a href="/legal/disclaimer" className="hover:underline">Disclaimer</a>
        </nav>
      </div>
    </footer>
  )
}
