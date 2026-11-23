import { http } from './http'
import type { LoginRequest, RegisterRequest, PasswordChange, Tokens, User } from '@/types/api'

async function authPost<T>(path: string, body?: unknown, protectedRequest = false): Promise<T> {
  const { data: csrf } = await http.get<{ token: string; headerName: string }>('/auth/csrf', {
    anonymous: true,
  })
  const { data } = await http.post<T>(`/auth/${path}`, body, {
    anonymous: !protectedRequest,
    retried: path === 'change-password',
    headers: { [csrf.headerName]: csrf.token },
  })
  return data
}

export const authApi = {
  refresh: () => authPost<Tokens>('refresh'),
  login: (body: LoginRequest) => authPost<Tokens>('login', body),
  register: (body: RegisterRequest) => authPost<Tokens>('register', body),
  logout: () => authPost<void>('logout'),
  logoutAll: () => authPost<void>('logout-all', undefined, true),
  changePassword: (body: PasswordChange) => authPost<void>('change-password', body, true),
  me: async () => (await http.get<User>('/users/me')).data,
  update: async (displayName: string) => (await http.put<User>('/users/me', { displayName })).data,
}
