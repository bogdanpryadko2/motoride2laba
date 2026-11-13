<script setup lang="ts">
import { ru as ui } from '@/locales/ru'
import { onMounted } from 'vue'
import MotoCard from '@/components/MotoCard.vue'
import RequestState from '@/components/ui/RequestState.vue'
import { motorcyclesApi } from '@/api/motorcycles'
import { useRequest } from '@/composables/useRequest'

const catalog = useRequest(() => motorcyclesApi.list({ page: 0, size: 4, sort: 'newest' }))
const top = useRequest(motorcyclesApi.top)

onMounted(() => {
  void catalog.load()
  void top.load()
})
</script>
<template>
  <div class="hero">
    <span class="hero-tag">{{ ui.home.tagline }}</span>
    <h1>
      {{ ui.home.title }} <span>{{ ui.home.subtitle }}</span>
    </h1>
    <p>{{ ui.home.description }}</p>
    <RouterLink to="/motorcycles">{{ ui.home.catalog }}</RouterLink>
  </div>
  <RequestState
    :loading="catalog.loading.value"
    :error="catalog.error.value"
    :empty="catalog.data.value?.content.length === 0"
    @retry="catalog.load"
  />
  <div class="moto-grid">
    <MotoCard v-for="moto in catalog.data.value?.content" :key="moto.id" :motorcycle="moto" />
  </div>
  <section class="top-section">
    <h2>{{ ui.home.top }}</h2>
    <RequestState
      :loading="top.loading.value"
      :error="top.error.value"
      :empty="top.data.value?.length === 0"
      @retry="top.load"
    />
    <div class="moto-grid">
      <MotoCard v-for="moto in top.data.value" :key="moto.id" :motorcycle="moto" />
    </div>
  </section>
</template>
<style scoped>
.top-section {
  margin-top: 32px;
}
</style>
