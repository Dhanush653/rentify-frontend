import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Building2, Menu, X } from 'lucide-react'
import { APP_NAME, ROUTES } from '@/utils/constants'
import { cn } from '@/utils/helpers'

const navLinks = [
  { to: ROUTES.HOME, label: 'Home' },
  { to: ROUTES.MY_PROPERTIES, label: 'My Properties' },
  { to: ROUTES.CREATE_PROPERTY, label: 'List Property' },
  { to: ROUTES.PROFILE, label: 'Profile' },
]

const linkClasses = ({ isActive }: { isActive: boolean }) =>
  cn('text-gray-600 hover:text-indigo-600', isActive && 'text-indigo-600')

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          to={ROUTES.HOME}
          onClick={closeMenu}
          className="flex items-center gap-2 font-semibold text-gray-900"
        >
          <Building2 className="h-5 w-5 text-indigo-600" aria-hidden="true" />
          {APP_NAME}
        </Link>

        {/* Desktop navigation */}
        <ul className="hidden items-center gap-6 text-sm md:flex">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} className={linkClasses}>
                {link.label}
              </NavLink>
            </li>
          ))}
          <li>
            <Link to={ROUTES.LOGIN} className="text-gray-600 hover:text-indigo-600">
              Login
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          className="rounded-md p-1 text-gray-600 hover:bg-gray-100 md:hidden"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6" aria-hidden="true" />
          )}
        </button>
      </nav>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <ul className="flex flex-col border-t border-gray-200 px-4 py-2 text-sm md:hidden">
          {navLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                onClick={closeMenu}
                className={(state) => cn('block py-2', linkClasses(state))}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          <li>
            <Link
              to={ROUTES.LOGIN}
              onClick={closeMenu}
              className="block py-2 text-gray-600 hover:text-indigo-600"
            >
              Login
            </Link>
          </li>
        </ul>
      )}
    </header>
  )
}

export default Navbar
