import { authPost, http } from './http'
import type { LoginRequest, RegisterRequest, PasswordChange, Tokens, User } from '@/types/api'

export const authApi = {
  login: (body: LoginRequest) => authPost<Tokens>('login', body),
  register: (body: RegisterRequest) => authPost<Tokens>('register', body),
  logout: () => authPost<void>('logout'),
  logoutAll: () => authPost<void>('logout-all', undefined, true),
  changePassword: (body: PasswordChange) => authPost<void>('change-password', body, true),
  me: async () => (await http.get<User>('/users/me')).data,
  update: async (displayName: string) => (await http.put<User>('/users/me', { displayName })).data,
}
