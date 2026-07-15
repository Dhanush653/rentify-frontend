import api from '@/api/axios'
import { API_ROUTES } from '@/utils/constants'
import type {
  AuthData,
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from '@/types/auth'

/** Auth endpoints. Each call unwraps the backend envelope to its `data`. */
export const authApi = {
  login: (payload: LoginRequest): Promise<AuthData> =>
    api
      .post<AuthResponse>(API_ROUTES.AUTH.LOGIN, payload)
      .then((res) => res.data.data),

  register: (payload: RegisterRequest): Promise<AuthData> =>
    api
      .post<AuthResponse>(API_ROUTES.AUTH.REGISTER, payload)
      .then((res) => res.data.data),
}
