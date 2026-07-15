import axios from 'axios'
import { ROUTES } from '@/utils/constants'
import { getToken, removeToken } from '@/utils/storage'

/** Shared axios instance. Every *Api module builds on this. */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Attach the bearer token to every outgoing request.
api.interceptors.request.use((config) => {
  const token = getToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// On 401 the session is dead: drop the token and bounce to /login.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeToken()

      if (window.location.pathname !== ROUTES.LOGIN) {
        window.location.assign(ROUTES.LOGIN)
      }
    }

    return Promise.reject(error)
  },
)

export default api
