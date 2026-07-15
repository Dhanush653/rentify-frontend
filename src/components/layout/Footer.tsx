import { Link } from 'react-router-dom'
import { Building2 } from 'lucide-react'
import { APP_NAME, ROUTES } from '@/utils/constants'

const Footer = () => (
  <footer className="border-t border-slate-200 bg-white">
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-center sm:flex-row sm:px-6">
      <Link to={ROUTES.HOME} className="flex items-center gap-2 text-sm font-bold tracking-tight text-slate-900">
        <span className="grid h-6 w-6 place-items-center rounded-md bg-blue-600 text-white">
          <Building2 className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
        {APP_NAME}
      </Link>
      <p className="text-xs text-slate-500">
        &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
      </p>
    </div>
  </footer>
)

export default Footer
