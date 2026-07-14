import { Outlet } from 'react-router-dom'

/**
 * Guards the authenticated routes.
 * TODO: read the session and <Navigate to={ROUTES.LOGIN} replace /> when signed out.
 */
const ProtectedRoute = () => <Outlet />

export default ProtectedRoute
