import type { ApiResponse } from './api'
import type { User } from './user'

export type PropertyType = 'HOUSE' | 'SHOP'

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

/** Lean shape returned by GET /api/properties (the listing/card view). */
export interface PropertyListItem {
  id: number
  title: string
  rent: number
  city: string
  area: string
  propertyType: PropertyType
  thumbnail: string
}

/** Query parameters accepted by GET /api/properties. */
export interface PropertySearchRequest {
  city?: string
  area?: string
  propertyType?: PropertyType | ''
  minRent?: number
  maxRent?: number
}

/** Backend envelope for the property list endpoint. */
export type PropertyListResponse = ApiResponse<PropertyListItem[]>

/* --- Create / Edit property --- */

export type FurnishingType = 'UNFURNISHED' | 'SEMI_FURNISHED' | 'FULLY_FURNISHED'
export type PreferredTenant = 'ANY' | 'FAMILY' | 'BACHELOR'
export type WaterSupply = 'CORPORATION' | 'BOREWELL' | 'BOTH'

/** Nested `features` object bound by the backend (sent as `features.*`). */
export interface PropertyFeatures {
  bedrooms: number
  bathrooms: number
  balconies: number
  builtUpArea: number
  floorNumber: number
  totalFloors: number
  carParking: boolean
  bikeParking: boolean
  furnishingType: FurnishingType
  preferredTenant: PreferredTenant
  waterSupply: WaterSupply
  propertyAge: number
  lift: boolean
  powerBackup: boolean
  wifi: boolean
  airConditioner: boolean
  security: boolean
  cctv: boolean
  petFriendly: boolean
}

/** Fields submitted (alongside `files`) to POST /api/properties. */
export interface CreatePropertyFormValues {
  title: string
  description: string
  rent: number
  deposit: number
  city: string
  area: string
  propertyType: PropertyType | ''
  latitude: number
  longitude: number
  features: PropertyFeatures
}

/** Geographic coordinates chosen on the map. */
export interface LatLng {
  lat: number
  lng: number
}

/** Full property returned by GET /api/properties/{id}. */
export interface PropertyDetails {
  id: number
  title: string
  description: string
  rent: number
  deposit: number
  city: string
  area: string
  propertyType: PropertyType
  ownerName: string
  ownerPhone: string
  imageUrls: string[]
  viewCount: number
  contactCount: number
  latitude: number
  longitude: number
  features: PropertyFeatures
  createdAt?: string
}

/** Backend envelope for the property details endpoint. */
export type PropertyDetailsResponse = ApiResponse<PropertyDetails>
