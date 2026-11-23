import { ref, shallowRef, onScopeDispose } from 'vue'
import { apiError } from '@/api/errors'
import type { ApiError } from '@/types/api'

export function useRequest<T>(request: () => Promise<T>) {
  const data = shallowRef<T>()
  const loading = ref(false)
  const error = ref<ApiError | null>(null)
  let latestRequestId = 0

  onScopeDispose(() => {
    latestRequestId++
  })

  async function load() {
    const requestId = ++latestRequestId

    loading.value = true
    error.value = null
    data.value = undefined
    try {
      const result = await request()
      if (requestId === latestRequestId) data.value = result
    } catch (e) {
      if (requestId === latestRequestId) error.value = apiError(e)
    } finally {
      if (requestId === latestRequestId) loading.value = false
    }
  }

  return { data, loading, error, load }
}
