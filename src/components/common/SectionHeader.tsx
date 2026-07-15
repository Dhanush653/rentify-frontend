import type { ReactNode } from 'react'

export interface SectionHeaderProps {
  title: string
  action?: ReactNode
}

/** Sub-section heading with an optional trailing action (e.g. a count). */
const SectionHeader = ({ title, action }: SectionHeaderProps) => (
  <div className="mb-5 flex items-center justify-between border-b border-slate-200 pb-3">
    <h2 className="text-lg font-bold text-slate-900">{title}</h2>
    {action && <div className="shrink-0 text-sm text-slate-500">{action}</div>}
  </div>
)

export default SectionHeader
