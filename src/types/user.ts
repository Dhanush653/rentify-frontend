export interface User {
  id: string
  name: string
  email: string
  phone?: string
  avatarUrl?: string
  createdAt: string
}

export interface UpdateProfileRequest {
  name: string
  phone?: string
  avatarUrl?: string
}
