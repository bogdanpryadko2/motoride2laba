import { ref } from 'vue'
import { apiError } from '@/api/errors'
import { ru as ui } from '@/locales/ru'
import type { ApiError } from '@/types/api'

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
