import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/utils/helpers'

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  isLoading?: boolean
  children: ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-emerald-600 text-white hover:bg-emerald-700',
  secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
  outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
  danger: 'bg-red-600 text-white hover:bg-red-700',
}

const Button = ({
  variant = 'primary',
  isLoading = false,
  disabled = false,
  className,
  children,
  ...props
}: ButtonProps) => (
  <button
    {...props}
    disabled={disabled || isLoading}
    className={cn(
      'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60',
      variantClasses[variant],
      className,
    )}
  >
    {isLoading ? 'Please wait...' : children}
  </button>
)

export default Button
