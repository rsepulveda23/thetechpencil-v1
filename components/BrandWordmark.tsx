import { cn } from '@/lib/utils'

export default function BrandWordmark({ className }: { className?: string }) {
  return <span className={cn('font-brand font-medium tracking-tight', className)}>The Tech Pencil</span>
}
