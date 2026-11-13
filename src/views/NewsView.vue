<script setup lang="ts">
import { ru as ui } from '@/locales/ru'
import { watch } from 'vue'
import { newsApi } from '@/api/news'
import { useRequest } from '@/composables/useRequest'
import { usePageQuery } from '@/composables/usePageQuery'
import { date } from '@/utils/format'
import RequestState from '@/components/ui/RequestState.vue'
import PageNav from '@/components/ui/PageNav.vue'
import ContentImage from '@/components/ui/ContentImage.vue'

const { page, changePage } = usePageQuery()
const { data, loading, error, load } = useRequest(() => newsApi.list(page.value, 12))

watch(page, load, { immediate: true })
</script>
<template>
  <section class="page">
    <h1>{{ ui.nav.news }}</h1>
    <RequestState :loading="loading" :error="error" :empty="data?.length === 0" @retry="load" />
    <div class="moto-grid">
      <article v-for="article in data" :key="article.id" class="panel">
        <ContentImage
          v-if="article.imageUrl"
          :src="article.imageUrl"
          :alt="article.title"
          class="card-image"
        />
        <h2>
          <RouterLink :to="`/news/${article.id}`" class="card-link">{{ article.title }}</RouterLink>
        </h2>
        <time class="muted" :datetime="article.publishedAt">{{ date(article.publishedAt) }}</time>
      </article>
    </div>
    <PageNav
      :page="page"
      :has-next="data?.length === 12"
      :disabled="loading"
      @change="changePage"
    />
  </section>
</template>
