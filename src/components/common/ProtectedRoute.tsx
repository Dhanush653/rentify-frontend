import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { ROUTES } from '@/utils/constants'
import { isLoggedIn } from '@/utils/storage'

/**
 * Guards the authenticated routes. Signed-out visitors are sent to /login,
 * remembering where they came from so we can send them back after login.
 */
const ProtectedRoute = () => {
  const location = useLocation()

  if (!isLoggedIn()) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />
  }

  return <Outlet />
}

export default ProtectedRoute
