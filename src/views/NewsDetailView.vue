<script setup lang="ts">
import { ru as ui } from '@/locales/ru'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { newsApi } from '@/api/news'
import { useRequest } from '@/composables/useRequest'
import { date } from '@/utils/format'
import RequestState from '@/components/ui/RequestState.vue'
import ContentImage from '@/components/ui/ContentImage.vue'

const route = useRoute()
const { data, loading, error, load } = useRequest(() => newsApi.get(Number(route.params.id)))

onMounted(load)
</script>
<template>
  <article class="page">
    <RouterLink to="/news">{{ ui.news.back }}</RouterLink
    ><RequestState :loading="loading" :error="error" @retry="load" /><template v-if="data"
      ><h1>{{ data.title }}</h1>
      <time :datetime="data.publishedAt" class="muted">{{ date(data.publishedAt) }}</time
      ><ContentImage
        v-if="data.imageUrl"
        :src="data.imageUrl"
        :alt="data.title"
        class="content-image"
      />
      <p class="prose">{{ data.content }}</p></template
    >
  </article>
</template>
