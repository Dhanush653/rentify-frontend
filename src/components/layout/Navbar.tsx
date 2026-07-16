import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Building2, LogOut, Menu, Plus, X } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { APP_NAME, ROUTES } from '@/utils/constants'
import { cn } from '@/utils/helpers'

const authedLinks = [
  { to: ROUTES.HOME, label: 'Home' },
  { to: ROUTES.MY_PROPERTIES, label: 'My Properties' },
  { to: ROUTES.PROFILE, label: 'Profile' },
]

const guestLinks = [{ to: ROUTES.HOME, label: 'Home' }]

// Desktop links get a small emerald underline indicator when active.
const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'relative py-1 text-sm font-medium transition-colors',
    'after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:rounded-full after:bg-emerald-400 after:transition-all',
    isActive
      ? 'text-white after:w-full'
      : 'text-slate-300 after:w-0 hover:text-white hover:after:w-full',
  )

// Solid emerald CTA — the one loud element on the dark bar.
const ctaClass =
  'inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-emerald-500/30 transition-colors hover:bg-emerald-400'

const ghostClass =
  'inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/10 hover:text-white'

const Brand = ({ onClick }: { onClick?: () => void }) => (
  <Link to={ROUTES.HOME} onClick={onClick} className="flex items-center gap-2.5">
    <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 text-white shadow-md shadow-emerald-500/30">
      <Building2 className="h-5 w-5" aria-hidden="true" />
    </span>
    <span className="text-lg font-extrabold tracking-tight text-white">
      {APP_NAME}
      <span className="text-emerald-400">.</span>
    </span>
  </Link>
)

const Navbar = () => {
  const [open, setOpen] = useState(false)
  const { isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const close = () => setOpen(false)

  const links = isAuthenticated ? authedLinks : guestLinks

  const handleLogout = () => {
    logout()
    close()
    toast.success('Logged out')
    navigate(ROUTES.HOME)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/90">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Brand onClick={close} />

        {/* Desktop */}
        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === ROUTES.HOME}>
              {link.label}
            </NavLink>
          ))}

          {/* Guests see the CTA too — it just routes them to login first. */}
          <Link to={isAuthenticated ? ROUTES.CREATE_PROPERTY : ROUTES.LOGIN} className={ctaClass}>
            <Plus className="h-4 w-4" aria-hidden="true" />
            Post Property
          </Link>

          {isAuthenticated ? (
            <button type="button" onClick={handleLogout} className={ghostClass}>
              <LogOut className="h-4 w-4" aria-hidden="true" />
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to={ROUTES.LOGIN}
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 ring-1 ring-inset ring-white/20 transition-colors hover:bg-white/10 hover:text-white"
              >
                Login
              </NavLink>
              <NavLink
                to={ROUTES.REGISTER}
                className="rounded-full px-4 py-2 text-sm font-medium text-slate-300 ring-1 ring-inset ring-white/20 transition-colors hover:bg-white/10 hover:text-white"
              >
                Register
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className="rounded-lg p-2 text-white transition-colors hover:bg-white/10 md:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/10 bg-slate-900 px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={close}
                end={link.to === ROUTES.HOME}
                className={({ isActive }) =>
                  cn(
                    'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-300'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white',
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-3">
            {/* Guests see the CTA too — it just routes them to login first. */}
            <Link
              to={isAuthenticated ? ROUTES.CREATE_PROPERTY : ROUTES.LOGIN}
              onClick={close}
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-emerald-500/30 hover:bg-emerald-400"
            >
              <Plus className="h-4 w-4" aria-hidden="true" />
              Post Property
            </Link>

            {isAuthenticated ? (
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                Logout
              </button>
            ) : (
              <>
                <NavLink
                  to={ROUTES.LOGIN}
                  onClick={close}
                  className="rounded-full px-4 py-2.5 text-center text-sm font-medium text-slate-300 ring-1 ring-inset ring-white/20 hover:bg-white/10 hover:text-white"
                >
                  Login
                </NavLink>
                <NavLink
                  to={ROUTES.REGISTER}
                  onClick={close}
                  className="rounded-full px-4 py-2.5 text-center text-sm font-medium text-slate-300 ring-1 ring-inset ring-white/20 hover:bg-white/10 hover:text-white"
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
