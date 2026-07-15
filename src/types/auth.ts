import type { ApiResponse } from './api'

/** Payload for POST /api/auth/login */
export interface LoginRequest {
  phoneNumber: string
  password: string
}

/** Payload for POST /api/auth/register */
export interface RegisterRequest {
  fullName: string
  phoneNumber: string
  password: string
}

/** The `data` object the auth endpoints return on success. */
export interface AuthData {
  token: string
  fullName: string
  phoneNumber: string
}

/** Full backend envelope, e.g. { status, message, data: { token, ... } }. */
export type AuthResponse = ApiResponse<AuthData>
