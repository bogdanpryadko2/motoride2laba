<script setup lang="ts">
import { ru as ui } from '@/locales/ru'
import { watch } from 'vue'
import { postsApi } from '@/api/posts'
import { useRequest } from '@/composables/useRequest'
import { usePageQuery } from '@/composables/usePageQuery'
import { useAuthStore } from '@/stores/auth'
import { date } from '@/utils/format'
import RequestState from '@/components/ui/RequestState.vue'
import PageNav from '@/components/ui/PageNav.vue'
import ContentImage from '@/components/ui/ContentImage.vue'
import ReactionBar from '@/components/social/ReactionBar.vue'

const auth = useAuthStore()
const { page, changePage } = usePageQuery()
const { data, loading, error, load } = useRequest(() => postsApi.list(page.value))

watch(page, load, { immediate: true })
</script>
<template>
  <section class="page">
    <div class="resource-row">
      <h1>{{ ui.nav.community }}</h1>
      <RouterLink v-if="auth.authenticated" to="/community/new" class="btn-secondary">{{
        ui.posts.create
      }}</RouterLink
      ><RouterLink v-else :to="{ path: '/login', query: { redirect: '/community/new' } }">{{
        ui.posts.signIn
      }}</RouterLink>
    </div>
    <RequestState
      :loading="loading"
      :error="error"
      :empty="data?.content.length === 0"
      @retry="load"
    />
    <article v-for="post in data?.content" :key="post.id" class="panel">
      <h2>
        <RouterLink :to="`/community/${post.id}`" class="card-link">{{ post.title }}</RouterLink>
      </h2>
      <p class="muted">{{ post.author.displayName }} · {{ date(post.createdAt) }}</p>
      <ContentImage
        v-if="post.imageUrl"
        :src="post.imageUrl"
        :alt="post.title"
        class="card-image post-preview"
      />
      <p class="prose">
        {{ post.content.slice(0, 300) }}{{ post.content.length > 300 ? '…' : '' }}
      </p>
      <RouterLink :to="`/community/${post.id}`">{{ ui.posts.read }}</RouterLink
      ><ReactionBar target="posts" :target-id="post.id" />
    </article>
    <PageNav
      :page="page"
      :has-next="!!data && page + 1 < data.totalPages"
      :total-pages="data?.totalPages"
      :disabled="loading"
      @change="changePage"
    />
  </section>
</template>
<style scoped>
.post-preview {
  max-width: 480px;
  margin-top: 14px;
}
</style>
