import { ru as ui } from '@/locales/ru'
import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { authApi } from '@/api/auth'
import { bindSession } from '@/api/http'
import { apiError } from '@/api/errors'
import type { LoginRequest, RegisterRequest, PasswordChange, Tokens, User } from '@/types/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const accessToken = ref<string | null>(null)
  const expiresAt = ref(0)
  const status = ref<'pending' | 'authenticated' | 'guest' | 'unavailable'>('pending')
  const sessionError = ref('')
  const busy = ref(false)
  const authenticated = computed(() => status.value === 'authenticated' && !!user.value)
  const isAdmin = computed(() => authenticated.value && user.value?.role === 'ADMIN')
  let initialization: Promise<void> | null = null
  let refreshFlight: Promise<Tokens> | null = null
  let sessionVersion = 0

  function clear() {
    sessionVersion++
    user.value = null
    accessToken.value = null
    expiresAt.value = 0
    status.value = 'guest'
    sessionError.value = ''
  }

  function accept(tokens: Tokens) {
    user.value = tokens.user
    accessToken.value = tokens.accessToken
    expiresAt.value = Date.now() + tokens.expiresIn * 1000
    status.value = 'authenticated'
    sessionError.value = ''
  }

  function fail(error: unknown) {
    clear()

    const problem = apiError(error)
    if (problem.status !== 401) {
      status.value = 'unavailable'
      sessionError.value = problem.message
    }
  }

  function tokenNeedsRefresh() {
    return Date.now() >= expiresAt.value - 5000
  }

  async function performRefresh() {
    const version = sessionVersion
    try {
      const tokens = await authApi.refresh()
      if (version !== sessionVersion) throw new Error(ui.session.changed)
      accept(tokens)
      return tokens
    } catch (error) {
      if (version === sessionVersion) fail(error)
      throw error
    } finally {
      refreshFlight = null
    }
  }

  function refreshSession() {
    refreshFlight ??= performRefresh()
    return refreshFlight
  }

  async function initialize(force = false) {
    if (initialization) return initialization
    if (!force && status.value !== 'pending') return
    status.value = 'pending'
    initialization = refreshSession()
      .then(() => undefined)
      .catch(() => undefined)
      .finally(() => {
        initialization = null
      })
    return initialization
  }

  async function runSessionOperation<T>(operation: () => Promise<T>): Promise<T> {
    if (busy.value) throw new Error(ui.session.busy)
    busy.value = true
    try {
      if (initialization) await initialization
      await refreshFlight?.catch(() => undefined)
      return await operation()
    } finally {
      busy.value = false
    }
  }

  async function login(body: LoginRequest) {
    await runSessionOperation(async () => {
      sessionVersion++
      accept(await authApi.login(body))
    })
  }

  async function register(body: RegisterRequest) {
    await runSessionOperation(async () => {
      sessionVersion++
      accept(await authApi.register(body))
    })
  }

  async function logout(all = false) {
    await runSessionOperation(async () => {
      if (all && accessToken.value && tokenNeedsRefresh()) await refreshSession()
      await (all ? authApi.logoutAll() : authApi.logout())
      clear()
    })
  }

  async function changePassword(body: PasswordChange) {
    await runSessionOperation(async () => {
      await authApi.changePassword(body)
      clear()
    })
  }

  async function loadProfile() {
    user.value = await authApi.me()
  }

  async function updateProfile(displayName: string) {
    user.value = await authApi.update(displayName)
  }

  function canEdit(authorId: number | null) {
    return authenticated.value && (isAdmin.value || user.value?.id === authorId)
  }

  bindSession({
    token: () => accessToken.value,
    expired: tokenNeedsRefresh,
    refresh: refreshSession,
  })

  return {
    user,
    accessToken,
    status,
    sessionError,
    busy,
    authenticated,
    isAdmin,
    initialize,
    login,
    register,
    logout,
    changePassword,
    loadProfile,
    updateProfile,
    canEdit,
  }
})
