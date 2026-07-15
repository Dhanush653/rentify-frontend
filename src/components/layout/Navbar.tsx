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

const linkClass = ({ isActive }: { isActive: boolean }) =>
  cn(
    'text-sm font-medium transition-colors',
    isActive ? 'text-white' : 'text-blue-100 hover:text-white',
  )

// Glassy pill button that stays "continuous" with the blue header.
const pillClass =
  'inline-flex items-center gap-1.5 rounded-lg bg-white/15 px-4 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-white/25 transition-colors hover:bg-white/25'

const ghostClass =
  'inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-blue-100 transition-colors hover:bg-white/10 hover:text-white'

const Brand = ({ onClick }: { onClick?: () => void }) => (
  <Link to={ROUTES.HOME} onClick={onClick} className="flex items-center gap-2.5">
    <span className="grid h-9 w-9 place-items-center rounded-lg bg-white/15 text-white ring-1 ring-inset ring-white/25">
      <Building2 className="h-5 w-5" aria-hidden="true" />
    </span>
    <span className="text-lg font-extrabold tracking-tight text-white">{APP_NAME}</span>
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
    <header className="sticky top-0 z-50 border-b border-blue-500/50 bg-blue-600">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Brand onClick={close} />

        {/* Desktop */}
        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === ROUTES.HOME}>
              {link.label}
            </NavLink>
          ))}

          {isAuthenticated ? (
            <>
              <Link to={ROUTES.CREATE_PROPERTY} className={pillClass}>
                <Plus className="h-4 w-4" aria-hidden="true" />
                Post Property
              </Link>
              <button type="button" onClick={handleLogout} className={ghostClass}>
                <LogOut className="h-4 w-4" aria-hidden="true" />
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to={ROUTES.LOGIN} className={linkClass}>
                Login
              </NavLink>
              <Link to={ROUTES.REGISTER} className={pillClass}>
                Register
              </Link>
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
        <div className="border-t border-blue-500/50 bg-blue-700 px-4 py-3 md:hidden">
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
                    isActive ? 'bg-white/15 text-white' : 'text-blue-100 hover:bg-white/10',
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="mt-3 flex flex-col gap-2 border-t border-blue-500/50 pt-3">
            {isAuthenticated ? (
              <>
                <Link
                  to={ROUTES.CREATE_PROPERTY}
                  onClick={close}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-white/15 px-4 py-2.5 text-sm font-semibold text-white ring-1 ring-inset ring-white/25 hover:bg-white/25"
                >
                  <Plus className="h-4 w-4" aria-hidden="true" />
                  Post Property
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2.5 text-sm font-medium text-blue-100 hover:bg-white/10 hover:text-white"
                >
                  <LogOut className="h-4 w-4" aria-hidden="true" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to={ROUTES.LOGIN}
                  onClick={close}
                  className="rounded-lg px-4 py-2.5 text-center text-sm font-medium text-blue-100 hover:bg-white/10 hover:text-white"
                >
                  Login
                </NavLink>
                <Link
                  to={ROUTES.REGISTER}
                  onClick={close}
                  className="rounded-lg bg-white/15 px-4 py-2.5 text-center text-sm font-semibold text-white ring-1 ring-inset ring-white/25 hover:bg-white/25"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
