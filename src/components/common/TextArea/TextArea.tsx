import type { TextareaHTMLAttributes } from 'react'
import { cn } from '@/utils/helpers'

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

const TextArea = ({ label, error, className, id, ...props }: TextAreaProps) => (
  <div className="flex flex-col gap-1">
    {label && (
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
    )}

    <textarea
      id={id}
      rows={4}
      {...props}
      className={cn(
        'rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:border-indigo-500',
        error && 'border-red-500',
        className,
      )}
    />

    {error && <span className="text-xs text-red-600">{error}</span>}
  </div>
)

export default TextArea
