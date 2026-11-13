import { ru as ui } from '@/locales/ru'
import axios, { AxiosHeaders } from 'axios'
import type { Tokens } from '@/types/api'

declare module 'axios' {
  interface AxiosRequestConfig {
    anonymous?: boolean
    retried?: boolean
    sentToken?: string | null
  }
}

export const http = axios.create({
  baseURL: `${(import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')}/api`,
  withCredentials: true,
  timeout: 15000,
  xsrfCookieName: undefined,
})
interface Session {
  token: () => string | null
  expired: () => boolean
  accept: (tokens: Tokens) => void
  fail: (error: unknown) => void
}

let session: Session | undefined

export function bindSession(value: Session) {
  session = value
}

let refreshFlight: Promise<Tokens> | null = null
let sessionVersion = 0

export function invalidateSessionRequests() {
  sessionVersion++
}

export async function waitForRefresh() {
  await refreshFlight?.catch(() => undefined)
}

export async function authPost<T>(
  path: string,
  body?: unknown,
  protectedRequest = false,
): Promise<T> {
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

export function refreshSession(): Promise<Tokens> {
  if (!refreshFlight) {
    const version = sessionVersion

    refreshFlight = authPost<Tokens>('refresh')
      .then((tokens) => {
        if (version !== sessionVersion) throw new Error(ui.session.changed)
        session?.accept(tokens)
        return tokens
      })
      .catch((error: unknown) => {
        if (version === sessionVersion) session?.fail(error)
        throw error
      })
      .finally(() => {
        refreshFlight = null
      })
  }
  return refreshFlight
}

http.interceptors.request.use(async (config) => {
  config.headers = AxiosHeaders.from(config.headers)
  if (config.anonymous) {
    config.headers.delete('Authorization')
    return config
  }
  if (session?.token() && session.expired()) await refreshSession()
  const token = session?.token() ?? null

  config.sentToken = token
  if (token) config.headers.set('Authorization', `Bearer ${token}`)
  else config.headers.delete('Authorization')
  return config
})
http.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (!axios.isAxiosError(error)) throw error
    const config = error.config
    if (
      error.response?.status !== 401 ||
      !config ||
      config.anonymous ||
      config.retried ||
      !config.sentToken
    )
      throw error
    config.retried = true
    if (session?.token() === config.sentToken) await refreshSession()
    if (!session?.token()) throw error
    return http.request(config)
  },
)
