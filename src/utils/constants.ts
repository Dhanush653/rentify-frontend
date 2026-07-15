export const APP_NAME = 'Rentify'

/** Client-side route paths. Keep in sync with routes/AppRoutes.tsx. */
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  PROPERTY_DETAILS: '/properties/:id',
  CREATE_PROPERTY: '/post-property',
  EDIT_PROPERTY: '/edit-property/:id',
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

/**
 * Enum option lists for the property form. Values match the backend enums
 * exactly; labels are derived for display via `humanizeEnum`.
 */
export const PROPERTY_TYPES = ['HOUSE', 'SHOP'] as const

export const FURNISHING_TYPES = ['UNFURNISHED', 'SEMI_FURNISHED', 'FULLY_FURNISHED'] as const

export const PREFERRED_TENANTS = ['ANY', 'FAMILY', 'BACHELOR'] as const

export const WATER_SUPPLY_TYPES = ['CORPORATION', 'BOREWELL', 'BOTH'] as const

/** Bounds for the Home page rent range slider. */
export const RENT_RANGE = { MIN: 0, MAX: 100000, STEP: 1000 } as const

/** Paid listing durations and their price (INR). */
export const LISTING_PLANS = [
  { days: 30, price: 500 },
  { days: 60, price: 800 },
  { days: 90, price: 1100 },
] as const

/** Accepted image MIME types for property photo uploads. */
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
