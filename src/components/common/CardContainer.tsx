import type { ReactNode } from 'react'
import { cn } from '@/utils/helpers'

export interface CardContainerProps {
  children: ReactNode
  className?: string
  as?: 'div' | 'section' | 'article'
}

/** White, rounded, bordered surface used for content cards across the app. */
const CardContainer = ({ children, className, as: Tag = 'div' }: CardContainerProps) => (
  <Tag className={cn('rounded-2xl border border-slate-200 bg-white p-5 sm:p-6', className)}>
    {children}
  </Tag>
)

export default CardContainer
