import api from '@/api/axios'
import { API_ROUTES } from '@/utils/constants'
import { pruneEmpty } from '@/utils/helpers'
import type { ApiResponse } from '@/types/api'
import type {
  CreatePropertyFormValues,
  PropertyDetails,
  PropertyDetailsResponse,
  PropertyListItem,
  PropertyListResponse,
  PropertySearchRequest,
} from '@/types/property'

/**
 * Serialise the form values + image files into multipart/form-data.
 *
 * Every top-level field is appended individually, and each nested feature is
 * appended as `features.<key>` so Spring Boot binds the nested `features`
 * object. The features object is never JSON-stringified.
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

  Object.entries(features).forEach(([key, value]) => {
    formData.append(`features.${key}`, String(value))
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
