import { Button, CircularProgress, type ButtonProps } from '@mui/material'

export interface ReusableButtonProps extends ButtonProps {
  /** Shows a spinner and disables the button while an action is in flight. */
  loading?: boolean
}

/**
 * MUI Button with a built-in loading state — disables itself and swaps its
 * content for a spinner, preventing duplicate submissions during API calls.
 */
const ReusableButton = ({
  loading = false,
  disabled,
  children,
  startIcon,
  ...props
}: ReusableButtonProps) => (
  <Button {...props} disabled={disabled || loading} startIcon={loading ? undefined : startIcon}>
    {loading ? <CircularProgress size={22} color="inherit" /> : children}
  </Button>
)

export default ReusableButton
