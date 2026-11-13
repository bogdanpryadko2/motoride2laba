import { ru as ui } from '@/locales/ru'
import { ref, shallowRef, onScopeDispose } from 'vue'
import { apiError } from '@/api/errors'
import type { ApiError } from '@/types/api'

export function useRequest<T>(request: () => Promise<T>) {
  const data = shallowRef<T>()
  const loading = ref(false)
  const error = ref<ApiError | null>(null)
  let revision = 0

  onScopeDispose(() => {
    revision++
  })

  async function load() {
    const current = ++revision

    loading.value = true
    error.value = null
    data.value = undefined
    try {
      const result = await request()
      if (current === revision) data.value = result
    } catch (e) {
      if (current === revision) error.value = apiError(e)
    } finally {
      if (current === revision) loading.value = false
    }
  }

  return { data, loading, error, load }
}

export function useMutation() {
  const busy = ref(false)
  const error = ref<ApiError | null>(null)
  const success = ref('')

  async function run(operation: () => Promise<void>, message: string = ui.common.saved) {
    if (busy.value) return false
    busy.value = true
    error.value = null
    success.value = ''
    try {
      await operation()
      success.value = message
      return true
    } catch (e) {
      error.value = apiError(e)
      return false
    } finally {
      busy.value = false
    }
  }

  return { busy, error, success, run }
}
