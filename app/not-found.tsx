export default function NotFound() {
  return (
    <div className="min-h-[40vh] grid place-items-center">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold">Page not found</h1>
        <p className="text-muted-foreground">The page you’re looking for doesn’t exist.</p>
        <div className="flex items-center justify-center gap-3">
          <a href="/" className="px-4 py-2 rounded bg-foreground text-background">Go home</a>
          <a href="/articles" className="px-4 py-2 rounded border">Browse articles</a>
        </div>
      </div>
    </div>
  )
}

