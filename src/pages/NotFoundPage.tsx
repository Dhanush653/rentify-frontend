import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { Home, MapPinOff } from 'lucide-react'
import Seo from '@/components/common/Seo'
import { ROUTES } from '@/utils/constants'

const NotFoundPage = () => (
  <div className="flex flex-col items-center gap-4 py-24 text-center">
    <Seo title="Page Not Found | Rentify" />

    <span className="grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-600">
      <MapPinOff className="h-8 w-8" aria-hidden="true" />
    </span>
    <p className="text-5xl font-extrabold tracking-tight text-slate-900">404</p>
    <h1 className="text-xl font-bold text-slate-900">This page doesn&apos;t exist</h1>
    <p className="max-w-sm text-sm text-slate-500">
      The page you&apos;re looking for may have been moved or removed.
    </p>

    <Button
      component={Link}
      to={ROUTES.HOME}
      variant="contained"
      size="large"
      startIcon={<Home size={18} />}
      sx={{ mt: 1 }}
    >
      Back to home
    </Button>
  </div>
)

export default NotFoundPage
