import { useCallback, useEffect, useState } from 'react'
import { AUTH_EVENT, isLoggedIn, removeToken, saveToken } from '@/utils/storage'

interface UseAuth {
  isAuthenticated: boolean
  login: (token: string) => void
  logout: () => void
}

/**
 * Reactive view of the auth session, backed by localStorage.
 *
 * Re-renders whenever the token changes — either in this tab (via the custom
 * `AUTH_EVENT`) or another tab (via the native `storage` event) — so the
 * Navbar and guards stay in sync without a global store.
 */
export const useAuth = (): UseAuth => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(isLoggedIn)

  useEffect(() => {
    const sync = () => setIsAuthenticated(isLoggedIn())

    window.addEventListener(AUTH_EVENT, sync)
    window.addEventListener('storage', sync)

    return () => {
      window.removeEventListener(AUTH_EVENT, sync)
      window.removeEventListener('storage', sync)
    }
  }, [])

  const login = useCallback((token: string) => saveToken(token), [])
  const logout = useCallback(() => removeToken(), [])

  return { isAuthenticated, login, logout }
}
