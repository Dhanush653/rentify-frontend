import { Link } from 'react-router-dom'
import { Building2 } from 'lucide-react'
import { APP_NAME, ROUTES } from '@/utils/constants'

const Footer = () => (
  <footer className="border-t border-white/10 bg-slate-900 text-slate-300">
    <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-10 text-center sm:px-6">
      <Link to={ROUTES.HOME} className="flex items-center gap-2.5">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 text-white shadow-md shadow-emerald-500/30">
          <Building2 className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="text-lg font-extrabold tracking-tight text-white">
          {APP_NAME}
          <span className="text-emerald-400">.</span>
        </span>
      </Link>
      <p className="max-w-md text-sm leading-relaxed text-slate-400">
        Find your next home or list your property in minutes. Houses and shops for rent,
        connected directly between owners and tenants — no middlemen.
      </p>
    </div>

    {/* Bottom bar */}
    <div className="border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-center sm:flex-row sm:px-6">
        <p className="text-xs text-slate-500">
          &copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </p>
        <p className="text-xs text-slate-500">Made for renters &amp; owners across India</p>
      </div>
    </div>
  </footer>
)

export default Footer
