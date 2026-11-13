import { ru as ui, formatting } from '@/locales/ru'

export const price = (value: number) =>
  new Intl.NumberFormat(formatting.locale, {
    style: 'currency',
    currency: formatting.currency,
    maximumFractionDigits: 2,
  }).format(value)

export function date(value: string) {
  return new Date(/Z$|[+-]\d\d:\d\d$/.test(value) ? value : `${value}Z`).toLocaleString(
    formatting.locale,
  )
}

export function safeRedirect(value: unknown): string {
  return typeof value === 'string' &&
    value.startsWith('/') &&
    !value.startsWith('//') &&
    !/[\\\r\n]/.test(value) &&
    !/^\/(login|register)([/?#]|$)/.test(value)
    ? value
    : '/'
}

export function passwordError(value: string): string {
  if ([...value].length < 8) return ui.auth.passwordMin
  if (new TextEncoder().encode(value).length > 72) return ui.auth.passwordMax
  return ''
}

export function imageUrl(value: string | null | undefined): string | undefined {
  if (!value) return undefined
  if (value.startsWith('/images/'))
    return `${(import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '')}${value}`
  return /^https?:\/\//i.test(value) ? value : undefined
}
