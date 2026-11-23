<script setup lang="ts">
import { ru as ui } from '@/locales/ru'
import { watch, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useFavoritesStore } from '@/stores/favorites'
import { useMutation } from '@/composables/useMutation'
import FormNotice from './ui/FormNotice.vue'

defineProps<{ motorcycleId: number }>()

const auth = useAuthStore()
const favorites = useFavoritesStore()
const ready = ref(false)
const { busy, error, success, run } = useMutation()

async function initialize() {
  ready.value = false
  ready.value = await run(() => favorites.load(), '')
}

watch(
  () => auth.user?.id,
  () => {
    if (auth.authenticated) void initialize()
  },
  { immediate: true },
)

async function toggle(id: number) {
  await run(
    () => favorites.toggle(id),
    favorites.has(id) ? ui.favorites.removed : ui.favorites.added,
  )
}
</script>
<template>
  <div v-if="auth.authenticated">
    <button
      class="btn-secondary"
      :disabled="busy || !ready"
      :aria-pressed="favorites.has(motorcycleId)"
      @click="toggle(motorcycleId)"
    >
      {{ favorites.has(motorcycleId) ? ui.favorites.remove : ui.favorites.add }}
    </button>
    <button v-if="error && !ready" class="btn-secondary" @click="initialize">
      {{ ui.favorites.retry }}
    </button>
    <FormNotice :error="error" :success="success" />
  </div>
  <RouterLink
    v-else
    :to="{ path: '/login', query: { redirect: `/motorcycles/${motorcycleId}` } }"
    >{{ ui.favorites.signIn }}</RouterLink
  >
</template>
