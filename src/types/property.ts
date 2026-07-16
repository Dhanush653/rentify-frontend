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

/**
 * Lean shape returned by GET /api/properties (the listing/card view).
 *
 * bedRooms / bathRooms are null for SHOP listings. The type-specific summary
 * fields (furnishingType, washroomAvailable, …) are not returned by the
 * backend yet — they're typed optional so cards light up automatically once
 * the list DTO includes them.
 */
export interface PropertyListItem {
  id: number
  title: string
  rent: number
  city: string
  area: string
  propertyType: PropertyType
  thumbnail: string
  bedRooms?: number | null
  bathRooms?: number | null
  isParkingAvailable?: boolean | null
  furnishingType?: FurnishingType | null
  washroomAvailable?: boolean | null
  mainRoadFacing?: boolean | null
  cornerShop?: boolean | null
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

/** Listing state as reported by the backend (e.g. ACTIVE, EXPIRED). */
export type PropertyStatus = 'ACTIVE' | 'INACTIVE' | 'EXPIRED' | (string & {})

/**
 * Owner-dashboard item returned by GET /api/properties/my-properties.
 *
 * status / viewCount / contactCount are not (yet) included in the backend
 * response, so they are optional and must be rendered defensively.
 */
export interface MyPropertyListItem extends PropertyListItem {
  status?: PropertyStatus
  viewCount?: number
  contactCount?: number
}

/** Backend envelope for the owner's property list endpoint. */
export type MyPropertyListResponse = ApiResponse<MyPropertyListItem[]>

/* --- Create / Edit property --- */

export type FurnishingType = 'UNFURNISHED' | 'SEMI_FURNISHED' | 'FULLY_FURNISHED'
export type PreferredTenant = 'ANY' | 'FAMILY' | 'BACHELOR'
export type WaterSupply = 'CORPORATION' | 'BOREWELL' | 'BOTH'

/**
 * Nested `features` object bound by the backend (sent as `features.*`).
 *
 * Common fields apply to every property; the house-only / shop-only blocks
 * are `null` (or omitted) when they don't apply to the property's type, so
 * everything is optional and must be rendered defensively.
 */
export interface PropertyFeatures {
  /* --- Common --- */
  builtUpArea?: number | null
  floorNumber?: number | null
  totalFloors?: number | null
  propertyAge?: number | null
  carParking?: boolean | null
  bikeParking?: boolean | null
  waterSupply?: WaterSupply | null
  lift?: boolean | null
  powerBackup?: boolean | null
  wifi?: boolean | null
  airConditioner?: boolean | null
  security?: boolean | null
  cctv?: boolean | null

  /* --- HOUSE only --- */
  bedrooms?: number | null
  bathrooms?: number | null
  balconies?: number | null
  furnishingType?: FurnishingType | null
  preferredTenant?: PreferredTenant | null
  petFriendly?: boolean | null

  /* --- SHOP only --- */
  washroomAvailable?: boolean | null
  mainRoadFacing?: boolean | null
  cornerShop?: boolean | null
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
  /** ISO LocalDateTime when the listing expires (derived from the chosen plan). */
  expiresAt: string
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
  whatsAppNumber?: string
  imageUrls: string[]
  viewCount: number
  contactCount: number
  latitude: number
  longitude: number
  features: PropertyFeatures
  status?: PropertyStatus
  createdAt?: string
}

/** Backend envelope for the property details endpoint. */
export type PropertyDetailsResponse = ApiResponse<PropertyDetails>
