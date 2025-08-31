export function readingTime(text: string, wpm = 225) {
  const words = text?.trim()?.split(/\s+/g)?.length || 0
  const mins = Math.max(1, Math.round(words / wpm))
  return { minutes: mins, label: `${mins} min read` }
}

export function formatDate(iso?: string) {
  if (!iso) return ''
  try {
    const d = new Date(iso)
    return d.toLocaleDateString(undefined, {
      year: 'numeric', month: 'short', day: 'numeric',
    } as any)
  } catch {
    return ''
  }
}

