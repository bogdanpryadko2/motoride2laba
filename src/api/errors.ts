import { ru as ui } from '@/locales/ru'
import axios from 'axios'
import type { ApiError } from '@/types/api'

const messages: Record<number, string> = {
  400: ui.errors.validation,
  401: ui.errors.unauthorized,
  403: ui.errors.forbidden,
  404: ui.errors.notFound,
  409: ui.errors.conflict,
  413: ui.errors.fileTooLarge,
  429: ui.errors.rateLimit,
}

export function apiError(error: unknown): ApiError {
  if (axios.isAxiosError<Partial<ApiError>>(error)) {
    const status = error.response?.status ?? 0
    return {
      status,
      message:
        error.response?.data?.message ||
        messages[status] ||
        (status ? ui.errors.server : ui.errors.network),
      fieldErrors: error.response?.data?.fieldErrors ?? {},
    }
  }
  return {
    status: 0,
    message: error instanceof Error ? error.message : ui.errors.operation,
    fieldErrors: {},
  }
}
