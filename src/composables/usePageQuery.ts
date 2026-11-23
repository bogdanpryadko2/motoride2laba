import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export function usePageQuery() {
  const route = useRoute()
  const router = useRouter()
  const page = computed(() => {
    const pageNumber = Number(route.query.page)
    return Number.isSafeInteger(pageNumber) && pageNumber >= 0 ? pageNumber : 0
  })

  function changePage(nextPage: number) {
    return router.push({ query: { ...route.query, page: nextPage || undefined } })
  }

  return { page, changePage }
}
