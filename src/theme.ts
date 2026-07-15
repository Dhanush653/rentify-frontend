import { createTheme } from '@mui/material/styles'

/**
 * App-wide MUI theme. A single blue accent on a white / slate-neutral surface,
 * Inter type, restrained radii and shadows — one consistent, professional look.
 */
export const theme = createTheme({
  palette: {
    primary: { main: '#2563eb', dark: '#1d4ed8', light: '#3b82f6' },
    background: { default: '#f8fafc', paper: '#ffffff' },
    text: { primary: '#0f172a', secondary: '#64748b' },
    divider: '#e2e8f0',
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: "'Inter', system-ui, 'Segoe UI', Roboto, sans-serif",
    button: { textTransform: 'none', fontWeight: 600 },
    h1: { fontWeight: 800, letterSpacing: '-0.02em' },
    h2: { fontWeight: 700, letterSpacing: '-0.02em' },
    h3: { fontWeight: 700, letterSpacing: '-0.01em' },
    h4: { fontWeight: 700, letterSpacing: '-0.01em' },
    h5: { fontWeight: 700 },
    h6: { fontWeight: 700 },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { borderRadius: 8 } },
    },
    MuiPaper: { defaultProps: { elevation: 0 } },
    MuiOutlinedInput: { styleOverrides: { root: { backgroundColor: '#fff' } } },
  },
})
