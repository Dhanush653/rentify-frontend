/** Envelope returned by the Rentify backend, e.g. { status, message, data }. */
export interface ApiResponse<T> {
  status: number
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
