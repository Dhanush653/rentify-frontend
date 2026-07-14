import { Link } from 'react-router-dom'
import { ROUTES } from '@/utils/constants'

const NotFoundPage = () => (
  <section className="flex flex-col items-center gap-3 py-20 text-center">
    <h1 className="text-2xl font-semibold text-gray-900">404 - Page Not Found</h1>
    <Link to={ROUTES.HOME} className="text-sm text-indigo-600 hover:underline">
      Back to home
    </Link>
  </section>
)

export default NotFoundPage
