import type { NavigationGuard } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

export const authGuard: NavigationGuard = async (to) => {
  const auth = useAuthStore()

  await auth.initialize()
  if (to.meta.auth && !auth.authenticated) {
    if (auth.status === 'unavailable')
      return { path: '/session-unavailable', query: { redirect: to.fullPath } }
    return { path: '/login', query: { redirect: to.fullPath } }
  }
  if (to.meta.admin && !auth.isAdmin) return '/forbidden'
  if (to.meta.guest && auth.authenticated) return '/'
  return true
}
