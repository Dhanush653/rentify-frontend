export const APP_NAME = 'Rentify'

/** Client-side route paths. Keep in sync with routes/AppRoutes.tsx. */
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PROPERTY_DETAILS: '/properties/:id',
  CREATE_PROPERTY: '/properties/new',
  EDIT_PROPERTY: '/properties/:id/edit',
  MY_PROPERTIES: '/my-properties',
  PROFILE: '/profile',
  NOT_FOUND: '*',
} as const

/** Backend endpoints, relative to VITE_API_URL. */
export const API_ROUTES = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
  },
  PROPERTIES: '/properties',
  MY_PROPERTIES: '/properties/me',
  USERS: '/users',
  PROFILE: '/users/me',
} as const

export const STORAGE_KEYS = {
  TOKEN: 'rentify.token',
  USER: 'rentify.user',
} as const

export const PROPERTY_TYPES = [
  { value: 'APARTMENT', label: 'Apartment' },
  { value: 'HOUSE', label: 'House' },
  { value: 'VILLA', label: 'Villa' },
  { value: 'STUDIO', label: 'Studio' },
  { value: 'PG', label: 'PG / Co-living' },
] as const
