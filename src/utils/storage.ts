import { STORAGE_KEYS } from '@/utils/constants'

/** Broadcast so in-app listeners (e.g. useAuth) react to sign in/out. */
export const AUTH_EVENT = 'rentify:auth-change'

const emitAuthChange = (): void => {
  window.dispatchEvent(new Event(AUTH_EVENT))
}

/** Thin, typed wrapper around localStorage. */
export const storage = {
  get<T>(key: string): T | null {
    const raw = localStorage.getItem(key)
    if (raw === null) return null

    try {
      return JSON.parse(raw) as T
    } catch {
      return null
    }
  },

  set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value))
  },

  remove(key: string): void {
    localStorage.removeItem(key)
  },

  clear(): void {
    localStorage.clear()
  },
}

/**
 * Auth token helpers. We persist only the JWT — never the user's name,
 * phone number or email.
 */
export const saveToken = (token: string): void => {
  storage.set(STORAGE_KEYS.TOKEN, token)
  emitAuthChange()
}

export const getToken = (): string | null => storage.get<string>(STORAGE_KEYS.TOKEN)

export const removeToken = (): void => {
  storage.remove(STORAGE_KEYS.TOKEN)
  emitAuthChange()
}

export const isLoggedIn = (): boolean => Boolean(getToken())
