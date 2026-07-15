import { useEffect, useState } from 'react'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import { Alert, Button, CircularProgress, IconButton, InputAdornment, TextField } from '@mui/material'
import { Building2, Eye, EyeOff } from 'lucide-react'
import { authApi } from '@/api/authApi'
import Seo from '@/components/common/Seo'
import { useAuth } from '@/hooks/useAuth'
import { APP_NAME, ROUTES } from '@/utils/constants'
import type { ApiError } from '@/types/api'

const loginSchema = z.object({
  phoneNumber: z
    .string()
    .trim()
    .regex(/^\d{10}$/, 'Enter a valid 10-digit phone number'),
  password: z.string().min(1, 'Password is required'),
})

type LoginFormValues = z.infer<typeof loginSchema>

const LoginPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated, login } = useAuth()

  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const from = (location.state as { from?: { pathname: string } } | null)?.from?.pathname ?? ROUTES.HOME

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, from, navigate])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { phoneNumber: '', password: '' },
  })

  const onSubmit = async (values: LoginFormValues) => {
    setFormError(null)

    try {
      const { token } = await authApi.login(values)
      login(token)
      toast.success('Logged in successfully')
      navigate(from, { replace: true })
    } catch (error) {
      const message =
        error instanceof AxiosError
          ? (error.response?.data as ApiError | undefined)?.message ??
            'Unable to log in. Please try again.'
          : 'Something went wrong. Please try again.'

      setFormError(message)
      toast.error(message)
    }
  }

  return (
    <div className="mx-auto w-full max-w-md py-6 sm:py-10">
      <Seo title="Sign In | Rentify" description="Sign in to your Rentify account to post and manage rental listings." />

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="grid h-11 w-11 place-items-center rounded-lg bg-blue-600 text-white">
            <Building2 className="h-5 w-5" aria-hidden="true" />
          </span>
          <h1 className="mt-3 text-xl font-bold text-slate-900">Welcome back</h1>
          <p className="mt-1 text-sm text-slate-500">Sign in to your {APP_NAME} account</p>
        </div>

        {formError && (
          <Alert severity="error" sx={{ mb: 2 }} onClose={() => setFormError(null)}>
            {formError}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
          <TextField
            {...register('phoneNumber')}
            label="Phone number"
            type="tel"
            fullWidth
            autoComplete="tel"
            autoFocus
            error={Boolean(errors.phoneNumber)}
            helperText={errors.phoneNumber?.message}
          />

          <TextField
            {...register('password')}
            label="Password"
            type={showPassword ? 'text' : 'password'}
            fullWidth
            autoComplete="current-password"
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((show) => !show)}
                      edge="end"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={isSubmitting}
            sx={{ mt: 1, py: 1.25 }}
          >
            {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Sign in'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Don&apos;t have an account?{' '}
          <RouterLink to={ROUTES.REGISTER} className="font-semibold text-blue-600 hover:underline">
            Create one
          </RouterLink>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
