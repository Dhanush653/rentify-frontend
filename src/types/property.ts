import type { User } from './user'

export type PropertyType = 'APARTMENT' | 'HOUSE' | 'VILLA' | 'STUDIO' | 'PG'

export interface PropertyLocation {
  address: string
  city: string
  state: string
  pincode: string
  latitude: number
  longitude: number
}

export interface Property {
  id: string
  title: string
  description: string
  type: PropertyType
  rent: number
  deposit: number
  bedrooms: number
  bathrooms: number
  areaSqft: number
  furnished: boolean
  available: boolean
  amenities: string[]
  images: string[]
  location: PropertyLocation
  owner: User
  createdAt: string
}

/** Shape submitted from PropertyForm (create + edit). */
export type PropertyFormValues = Omit<Property, 'id' | 'owner' | 'createdAt'>

export interface PropertyFilters {
  city?: string
  type?: PropertyType
  minRent?: number
  maxRent?: number
  bedrooms?: number
}
