<script setup lang="ts">
import { ru as ui } from '@/locales/ru'
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { postsApi } from '@/api/posts'
import { useRequest, useMutation } from '@/composables/useRequest'
import { useAuthStore } from '@/stores/auth'
import { date } from '@/utils/format'
import RequestState from '@/components/ui/RequestState.vue'
import ContentImage from '@/components/ui/ContentImage.vue'
import ConfirmDelete from '@/components/ui/ConfirmDelete.vue'
import ReactionBar from '@/components/social/ReactionBar.vue'
import CommentsSection from '@/components/social/CommentsSection.vue'

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()
const id = Number(route.params.id)
const removing = ref(false)
const { data, loading, error, load } = useRequest(() => postsApi.get(id))
const mutation = useMutation()

onMounted(load)

async function remove() {
  await mutation.run(async () => {
    await postsApi.remove(id)
    await router.push('/community')
  })
}
</script>
<template>
  <article class="page">
    <RouterLink to="/community">{{ ui.posts.back }}</RouterLink
    ><RequestState :loading="loading" :error="error" @retry="load" /><template v-if="data"
      ><h1>{{ data.title }}</h1>
      <p class="muted">{{ data.author.displayName }} · {{ date(data.createdAt) }}</p>
      <ContentImage
        v-if="data.imageUrl"
        :src="data.imageUrl"
        :alt="data.title"
        class="content-image" />
      <p class="prose">{{ data.content }}</p>
      <RouterLink v-if="data.motorcycleId" :to="`/motorcycles/${data.motorcycleId}`">{{
        ui.posts.motorcycle
      }}</RouterLink>
      <div v-if="auth.canEdit(data.author.id)" class="actions">
        <RouterLink :to="`/community/${id}/edit`" class="btn-secondary">{{
          ui.common.edit
        }}</RouterLink
        ><button class="btn-secondary danger" @click="removing = true">
          {{ ui.common.delete }}
        </button>
      </div>
      <ReactionBar target="posts" :target-id="id" /><CommentsSection :post-id="id" /></template
    ><ConfirmDelete
      :open="removing"
      :busy="mutation.busy.value"
      :error="mutation.error.value?.message"
      :label="ui.resources.post"
      @cancel="removing = false"
      @confirm="remove"
    />
  </article>
</template>
