import { ref, watch } from 'vue'
import { defineStore } from 'pinia'
import { favoritesApi } from '@/api/favorites'
import { useAuthStore } from './auth'
import type { Favorite } from '@/types/api'

export const useFavoritesStore = defineStore('favorites', () => {
  const auth = useAuthStore()
  const items = ref<Favorite[]>([])
  const loaded = ref(false)
  let flight: Promise<void> | null = null
  let revision = 0

  watch(
    () => auth.user?.id,
    () => {
      revision++
      items.value = []
      loaded.value = false
      flight = null
    },
    { flush: 'sync' },
  )

  async function load(force = false) {
    if (!auth.authenticated) return
    if (flight) return flight
    if (loaded.value && !force) return
    const current = revision

    flight = (async () => {
      const all: Favorite[] = []
      for (let page = 0; ; page++) {
        const batch = await favoritesApi.list(page, 100)
        if (current !== revision) return
        all.push(...batch)
        if (batch.length < 100) break
      }
      items.value = all
      loaded.value = true
    })().finally(() => {
      if (current === revision) flight = null
    })
    return flight
  }

  function has(id: number) {
    return items.value.some((item) => item.motorcycle.id === id)
  }

  async function toggle(id: number) {
    const current = revision
    if (has(id)) {
      await favoritesApi.remove(id)
      if (current === revision)
        items.value = items.value.filter((item) => item.motorcycle.id !== id)
    } else {
      const result = await favoritesApi.add(id)
      if (current === revision && !has(id)) items.value.push(result)
    }
  }

  return { items, loaded, load, has, toggle }
})
