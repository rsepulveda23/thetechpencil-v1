import { cn } from '@/lib/utils'

export default function BrandWordmark({ className }: { className?: string }) {
  return (
    <span className={cn('font-brand font-semibold tracking-tight text-xl md:text-3xl', className)}>
      TheTechPencil
    </span>
  )
}
