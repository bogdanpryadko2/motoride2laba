import axios from 'axios'
import type { InternalAxiosRequestConfig } from 'axios'

interface HttpSession {
  token: () => string | null
  expired: () => boolean
  refresh: () => Promise<unknown>
}

declare module 'axios' {
  interface AxiosRequestConfig {
    anonymous?: boolean
    retried?: boolean
    sentToken?: string | null
  }
}

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  withCredentials: true,
  timeout: 15000,
  xsrfCookieName: undefined,
})

let session: HttpSession | undefined

export function bindSession(value: HttpSession) {
  session = value
}

async function prepareRequest(config: InternalAxiosRequestConfig) {
  if (config.anonymous) {
    config.headers.delete('Authorization')
    return config
  }

  if (session?.token() && session.expired()) await session.refresh()

  const token = session?.token() ?? null
  config.sentToken = token
  if (token) config.headers.set('Authorization', `Bearer ${token}`)
  else config.headers.delete('Authorization')
  return config
}

async function handleResponseError(error: unknown) {
  if (!axios.isAxiosError(error)) throw error

  const config = error.config
  if (
    error.response?.status !== 401 ||
    !config ||
    config.anonymous ||
    config.retried ||
    !config.sentToken
  ) {
    throw error
  }

  config.retried = true
  if (session?.token() === config.sentToken) await session.refresh()
  if (!session?.token()) throw error
  return http.request(config)
}

http.interceptors.request.use(prepareRequest)
http.interceptors.response.use((response) => response, handleResponseError)
