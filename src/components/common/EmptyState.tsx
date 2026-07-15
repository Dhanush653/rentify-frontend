import type { ReactNode } from 'react'
import { SearchX } from 'lucide-react'

export interface EmptyStateProps {
  title: string
  description?: string
  action?: ReactNode
}

const EmptyState = ({ title, description, action }: EmptyStateProps) => (
  <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
    <span className="grid h-14 w-14 place-items-center rounded-full bg-slate-100 text-slate-400">
      <SearchX className="h-7 w-7" aria-hidden="true" />
    </span>
    <h3 className="text-base font-semibold text-slate-900">{title}</h3>
    {description && <p className="max-w-sm text-sm text-slate-500">{description}</p>}
    {action}
  </div>
)

export default EmptyState
