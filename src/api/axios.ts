import axios from 'axios'
import { STORAGE_KEYS } from '@/utils/constants'
import { storage } from '@/utils/storage'

/** Shared axios instance. Every *Api module builds on this. */
export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Attach the bearer token to every outgoing request.
api.interceptors.request.use((config) => {
  const token = storage.get<string>(STORAGE_KEYS.TOKEN)

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

// TODO: handle 401 (sign out + redirect) and normalise errors once auth is wired up.
api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
)

export default api
