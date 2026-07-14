/** Envelope returned by the Rentify backend. */
export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

export interface PaginatedResponse<T> {
  items: T[]
  page: number
  pageSize: number
  totalItems: number
  totalPages: number
}

export interface ApiError {
  status: number
  message: string
  errors?: Record<string, string>
}
