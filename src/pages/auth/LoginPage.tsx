import { useEffect, useState } from 'react'
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { AxiosError } from 'axios'
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { Building2, Eye, EyeOff } from 'lucide-react'
import { authApi } from '@/api/authApi'
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

  // Where to land after a successful login (defaults to Home).
  const from = (location.state as { from?: { pathname: string } } | null)?.from?.pathname ?? ROUTES.HOME

  // Already signed in? Skip the form.
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
    <Container maxWidth="sm" sx={{ py: { xs: 6, sm: 10 } }}>
      <Paper elevation={0} sx={{ p: { xs: 3, sm: 5 }, borderRadius: 3, border: '1px solid #e5e7eb' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
          <Building2 size={32} color="#4f46e5" />
          <Typography variant="h5" component="h1" sx={{ mt: 1.5, fontWeight: 600 }}>
            Welcome back
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sign in to your {APP_NAME} account
          </Typography>
        </Box>

        {formError && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setFormError(null)}>
            {formError}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <TextField
            {...register('phoneNumber')}
            label="Phone number"
            type="tel"
            fullWidth
            margin="normal"
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
            margin="normal"
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
            sx={{ mt: 3, textTransform: 'none', py: 1.25 }}
          >
            {isSubmitting ? <CircularProgress size={24} color="inherit" /> : 'Sign in'}
          </Button>
        </Box>

        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 3 }}>
          Don&apos;t have an account?{' '}
          <Link
            component={RouterLink}
            to={ROUTES.REGISTER}
            underline="hover"
            sx={{ fontWeight: 600 }}
          >
            Create one
          </Link>
        </Typography>
      </Paper>
    </Container>
  )
}

export default LoginPage