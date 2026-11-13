<script setup lang="ts">
import { ru as ui } from '@/locales/ru'
import { computed, onMounted } from 'vue'
import { useFavoritesStore } from '@/stores/favorites'
import { useMutation } from '@/composables/useRequest'
import { usePageQuery } from '@/composables/usePageQuery'
import MotoCard from '@/components/MotoCard.vue'
import RequestState from '@/components/ui/RequestState.vue'
import FormNotice from '@/components/ui/FormNotice.vue'
import PageNav from '@/components/ui/PageNav.vue'

const favorites = useFavoritesStore()
const { page, changePage } = usePageQuery()
const { busy, error, success, run } = useMutation()
const visible = computed(() => favorites.items.slice(page.value * 12, (page.value + 1) * 12))

async function load() {
  await run(() => favorites.load(true), '')
}

async function remove(id: number) {
  await run(async () => {
    await favorites.toggle(id)
    if (page.value > 0 && !visible.value.length) await changePage(page.value - 1)
  }, ui.favorites.removed)
}

onMounted(load)
</script>
<template>
  <section class="page">
    <h1>{{ ui.nav.favorites }}</h1>
    <RequestState
      :loading="busy && !favorites.loaded"
      :error="error"
      :empty="favorites.loaded && !visible.length"
      @retry="load"
    /><FormNotice :success="success" />
    <div class="moto-grid">
      <div v-for="favorite in visible" :key="favorite.id" class="stack">
        <MotoCard :motorcycle="favorite.motorcycle" /><button
          class="btn-secondary"
          :disabled="busy"
          @click="remove(favorite.motorcycle.id)"
        >
          {{ ui.favorites.remove }}
        </button>
      </div>
    </div>
    <PageNav
      :page="page"
      :has-next="(page + 1) * 12 < favorites.items.length"
      :disabled="busy"
      @change="changePage"
    />
  </section>
</template>
