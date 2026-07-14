import { z } from 'zod'

/**
 * Reusable Zod primitives shared by the auth, property and profile forms.
 * Form-level schemas live next to the form that uses them.
 */
export const emailSchema = z.email('Enter a valid email address')

export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')

export const requiredString = (label: string) =>
  z.string().trim().min(1, `${label} is required`)

export const positiveNumber = (label: string) =>
  z.coerce.number().positive(`${label} must be greater than 0`)
