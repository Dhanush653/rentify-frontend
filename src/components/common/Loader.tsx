import { Loader2 } from 'lucide-react'

export interface LoaderProps {
  label?: string
}

const Loader = ({ label = 'Loading...' }: LoaderProps) => (
  <div className="flex flex-col items-center justify-center gap-3 py-20 text-slate-500">
    <Loader2 className="h-7 w-7 animate-spin text-emerald-600" aria-hidden="true" />
    <span className="text-sm font-medium">{label}</span>
  </div>
)

export default Loader
