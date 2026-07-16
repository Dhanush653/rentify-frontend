import type { InputHTMLAttributes } from 'react'
import { cn } from '@/utils/helpers'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input = ({ label, error, className, id, ...props }: InputProps) => (
  <div className="flex flex-col gap-1">
    {label && (
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
    )}

    <input
      id={id}
      {...props}
      className={cn(
        'rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-emerald-500',
        error && 'border-red-500',
        className,
      )}
    />

    {error && <span className="text-xs text-red-600">{error}</span>}
  </div>
)

export default Input
