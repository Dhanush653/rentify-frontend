import { Loader2 } from 'lucide-react'

export interface LoaderProps {
  label?: string
}

const Loader = ({ label = 'Loading...' }: LoaderProps) => (
  <div className="flex items-center justify-center gap-2 py-10 text-gray-500">
    <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
    <span className="text-sm">{label}</span>
  </div>
)

export default Loader
