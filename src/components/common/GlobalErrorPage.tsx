import { Button } from '@mui/material'
import { RefreshCw, ServerCrash } from 'lucide-react'

export interface GlobalErrorPageProps {
  onReset?: () => void
}

/** Full-page fallback rendered by the ErrorBoundary when the app crashes. */
const GlobalErrorPage = ({ onReset }: GlobalErrorPageProps) => (
  <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50 px-4 text-center">
    <span className="grid h-16 w-16 place-items-center rounded-full bg-red-50 text-red-500">
      <ServerCrash className="h-8 w-8" aria-hidden="true" />
    </span>
    <h1 className="text-2xl font-extrabold tracking-tight text-slate-900">Something broke</h1>
    <p className="max-w-md text-sm text-slate-500">
      An unexpected error occurred. Reloading the page usually fixes it.
    </p>
    <Button
      variant="contained"
      size="large"
      startIcon={<RefreshCw size={18} />}
      onClick={() => {
        onReset?.()
        window.location.reload()
      }}
      sx={{ mt: 1 }}
    >
      Reload page
    </Button>
  </div>
)

export default GlobalErrorPage
