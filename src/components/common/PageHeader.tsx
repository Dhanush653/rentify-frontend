import type { ReactNode } from 'react'

export interface PageHeaderProps {
  title: string
  subtitle?: string
  action?: ReactNode
}

/** Standard page title block with an optional trailing action. */
const PageHeader = ({ title, subtitle, action }: PageHeaderProps) => (
  <div className="flex flex-col gap-3 border-b border-slate-200 pb-4 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
    </div>
    {action && <div className="shrink-0">{action}</div>}
  </div>
)

export default PageHeader
