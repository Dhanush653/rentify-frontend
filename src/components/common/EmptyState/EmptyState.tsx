import type { ReactNode } from 'react'
import { Inbox } from 'lucide-react'

export interface EmptyStateProps {
  title: string
  description?: string
  action?: ReactNode
}

const EmptyState = ({ title, description, action }: EmptyStateProps) => (
  <div className="flex flex-col items-center gap-2 py-16 text-center">
    <Inbox className="h-8 w-8 text-gray-400" aria-hidden="true" />
    <h3 className="text-base font-semibold text-gray-900">{title}</h3>
    {description && <p className="text-sm text-gray-500">{description}</p>}
    {action}
  </div>
)

export default EmptyState
