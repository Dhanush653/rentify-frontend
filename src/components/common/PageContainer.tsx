import type { ReactNode } from 'react'
import { cn } from '@/utils/helpers'

const WIDTHS = {
  default: 'max-w-6xl',
  narrow: 'max-w-3xl',
  wide: 'max-w-7xl',
} as const

export interface PageContainerProps {
  children: ReactNode
  width?: keyof typeof WIDTHS
  className?: string
}

/** Centered, max-width page wrapper for consistent horizontal rhythm. */
const PageContainer = ({ children, width = 'default', className }: PageContainerProps) => (
  <div className={cn('mx-auto w-full', WIDTHS[width], className)}>{children}</div>
)

export default PageContainer
