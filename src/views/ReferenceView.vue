<script setup lang="ts">
import { ru as ui } from '@/locales/ru'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { categoriesApi } from '@/api/categories'
import { technologiesApi } from '@/api/technologies'
import { useRequest } from '@/composables/useRequest'
import RequestState from '@/components/ui/RequestState.vue'

const route = useRoute()
const { data, loading, error, load } = useRequest(() =>
  route.meta.reference === 'category'
    ? categoriesApi.get(String(route.params.slug))
    : technologiesApi.get(Number(route.params.id)),
)

onMounted(load)
</script>
<template>
  <section class="page">
    <RequestState :loading="loading" :error="error" @retry="load" /><template v-if="data"
      ><h1>{{ data.name }}</h1>
      <p class="prose">{{ data.description || ui.common.noDescription }}</p>
      <RouterLink
        v-if="route.params.slug"
        :to="{ path: '/motorcycles', query: { category: String(route.params.slug) } }"
        >{{ ui.motorcycles.categoryLink }}</RouterLink
      ></template
    >
  </section>
</template>
