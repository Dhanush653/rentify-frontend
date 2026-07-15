import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'

export interface FeatureCardProps {
  icon: LucideIcon
  label: string
  value: ReactNode
}

/** A single labelled property attribute with a blue icon chip. */
const FeatureCard = ({ icon: Icon, label, value }: FeatureCardProps) => (
  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 transition hover:border-blue-200 hover:shadow-sm">
    <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
      <Icon className="h-5 w-5" aria-hidden="true" />
    </span>
    <div className="min-w-0">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="truncate text-sm font-semibold text-slate-900">{value}</p>
    </div>
  </div>
)

export default FeatureCard
