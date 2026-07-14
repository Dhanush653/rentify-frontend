import { Link, NavLink } from 'react-router-dom'
import { Building2 } from 'lucide-react'
import { APP_NAME, ROUTES } from '@/utils/constants'
import { cn } from '@/utils/helpers'

const navLinks = [
  { to: ROUTES.HOME, label: 'Home' },
  { to: ROUTES.MY_PROPERTIES, label: 'My Properties' },
  { to: ROUTES.CREATE_PROPERTY, label: 'List Property' },
  { to: ROUTES.PROFILE, label: 'Profile' },
]

const Navbar = () => (
  <header className="border-b border-gray-200 bg-white">
    <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
      <Link to={ROUTES.HOME} className="flex items-center gap-2 font-semibold text-gray-900">
        <Building2 className="h-5 w-5 text-indigo-600" aria-hidden="true" />
        {APP_NAME}
      </Link>

      <ul className="flex items-center gap-6 text-sm">
        {navLinks.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                cn('text-gray-600 hover:text-indigo-600', isActive && 'text-indigo-600')
              }
            >
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
    </nav>
  </header>
)

export default Navbar
