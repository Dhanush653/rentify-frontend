import { Button } from '@mui/material'
import { AlertTriangle, RefreshCw } from 'lucide-react'

export interface ErrorStateProps {
  title?: string
  message?: string
  onRetry?: () => void
}

/** Friendly, reusable error panel with a retry action (never shows raw errors). */
const ErrorState = ({
  title = 'Something went wrong',
  message = "We couldn't load this right now. Please try again.",
  onRetry,
}: ErrorStateProps) => (
  <div className="flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white py-16 text-center">
    <span className="grid h-14 w-14 place-items-center rounded-full bg-red-50 text-red-500">
      <AlertTriangle className="h-7 w-7" aria-hidden="true" />
    </span>
    <h3 className="text-base font-semibold text-slate-900">{title}</h3>
    <p className="max-w-sm text-sm text-slate-500">{message}</p>
    {onRetry && (
      <Button
        variant="contained"
        onClick={onRetry}
        startIcon={<RefreshCw size={16} />}
        sx={{ mt: 1 }}
      >
        Try again
      </Button>
    )}
  </div>
)

export default ErrorState
