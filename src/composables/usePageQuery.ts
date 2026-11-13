import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export function usePageQuery() {
  const route = useRoute()
  const router = useRouter()
  const page = computed(() => {
    const value = Number(route.query.page)
    return Number.isSafeInteger(value) && value >= 0 ? value : 0
  })

  function changePage(value: number) {
    return router.push({ query: { ...route.query, page: value || undefined } })
  }

  return { page, changePage }
}
