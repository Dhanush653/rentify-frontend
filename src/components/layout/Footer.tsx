import { Link } from 'react-router-dom'
import { Building2 } from 'lucide-react'
import { APP_NAME, ROUTES } from '@/utils/constants'

const Footer = () => (
  <footer className="mt-8 border-t border-slate-200 bg-white">
    <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <Link to={ROUTES.HOME} className="flex items-center gap-2.5">
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-blue-600 text-white">
          <Building2 className="h-4 w-4" aria-hidden="true" />
        </span>
        <span className="text-base font-bold tracking-tight text-slate-900">{APP_NAME}</span>
      </Link>

      <p className="text-sm text-slate-500">
        &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
      </p>
    </div>
  </footer>
)

export default Footer
