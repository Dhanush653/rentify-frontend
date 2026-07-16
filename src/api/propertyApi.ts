import api from '@/api/axios'
import {
  API_ROUTES,
  COMMON_FEATURE_KEYS,
  HOUSE_FEATURE_KEYS,
  SHOP_FEATURE_KEYS,
} from '@/utils/constants'
import { pruneEmpty } from '@/utils/helpers'
import type { ApiResponse } from '@/types/api'
import type {
  CreatePropertyFormValues,
  MyPropertyListItem,
  MyPropertyListResponse,
  PropertyDetails,
  PropertyDetailsResponse,
  PropertyFeatures,
  PropertyListItem,
  PropertyListResponse,
  PropertySearchRequest,
  PropertyType,
} from '@/types/property'

/** The `features.*` keys that apply to the selected property type. */
const featureKeysFor = (
  propertyType: PropertyType | '',
): readonly (keyof PropertyFeatures)[] => {
  if (propertyType === 'HOUSE') return [...COMMON_FEATURE_KEYS, ...HOUSE_FEATURE_KEYS]
  if (propertyType === 'SHOP') return [...COMMON_FEATURE_KEYS, ...SHOP_FEATURE_KEYS]
  return COMMON_FEATURE_KEYS
}

/**
 * Serialise the form values + image files into multipart/form-data.
 *
 * Every top-level field is appended individually, and each nested feature is
 * appended as `features.<key>` so Spring Boot binds the nested `features`
 * object. Only the keys applicable to the selected property type are sent —
 * house-only fields are never appended for shops and vice versa.
 */
const toPropertyFormData = (
  values: CreatePropertyFormValues,
  files: File[],
): FormData => {
  const { features, ...top } = values
  const formData = new FormData()

  Object.entries(top).forEach(([key, value]) => {
    formData.append(key, String(value))
  })

  featureKeysFor(values.propertyType).forEach((key) => {
    const value = features[key]
    if (value !== undefined && value !== null) {
      formData.append(`features.${key}`, String(value))
    }
  })

  files.forEach((file) => formData.append('files', file))

  return formData
}

/** Property endpoints. Each call unwraps the backend envelope to its `data`. */
export const propertyApi = {
  /** GET /api/properties — filtering happens server-side via query params. */
  getAllProperties: (filters: PropertySearchRequest = {}): Promise<PropertyListItem[]> =>
    api
      .get<PropertyListResponse>(API_ROUTES.PROPERTIES, {
        params: pruneEmpty(filters),
      })
      .then((res) => res.data.data),

  /** GET /api/properties/my-properties — every listing created by the signed-in user. */
  getMyProperties: (): Promise<MyPropertyListItem[]> =>
    api
      .get<MyPropertyListResponse>(API_ROUTES.MY_PROPERTIES)
      .then((res) => res.data.data),

  /** DELETE /api/properties/delete/{id} — permanently remove one of the user's listings. */
  deleteProperty: (id: number): Promise<void> =>
    api.delete(`${API_ROUTES.PROPERTIES}/delete/${id}`).then(() => undefined),

  /** GET /api/properties/{id} — full details for a single property. */
  getPropertyById: (id: string | number): Promise<PropertyDetails> =>
    api
      .get<PropertyDetailsResponse>(`${API_ROUTES.PROPERTIES}/${id}`)
      .then((res) => res.data.data),

  /**
   * POST /api/properties (multipart) — returns the new property's id.
   * No Content-Type is set: axios detects the FormData and sets
   * `multipart/form-data` together with the required boundary.
   */
  createProperty: (
    values: CreatePropertyFormValues,
    files: File[],
  ): Promise<number> =>
    api
      .post<ApiResponse<{ id: number }>>(
        API_ROUTES.PROPERTIES,
        toPropertyFormData(values, files),
      )
      .then((res) => res.data.data.id),
}
