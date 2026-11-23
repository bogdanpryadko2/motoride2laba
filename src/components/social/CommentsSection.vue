<script setup lang="ts">
import { ru as ui } from '@/locales/ru'
import { ref, watch } from 'vue'
import { postsApi } from '@/api/posts'
import { useRequest } from '@/composables/useRequest'
import { useMutation } from '@/composables/useMutation'
import { useAuthStore } from '@/stores/auth'
import { date } from '@/utils/format'
import type { Comment } from '@/types/api'
import RequestState from '@/components/ui/RequestState.vue'
import PageNav from '@/components/ui/PageNav.vue'
import ConfirmDelete from '@/components/ui/ConfirmDelete.vue'
import FormNotice from '@/components/ui/FormNotice.vue'
import TextEntryForm from './TextEntryForm.vue'
import ReactionBar from './ReactionBar.vue'

const props = defineProps<{ postId: number }>()
const auth = useAuthStore()
const page = ref(0)
const editing = ref<Comment | null>(null)
const removing = ref<number | null>(null)
const formKey = ref(0)
const { data, loading, error, load } = useRequest(() => postsApi.comments(props.postId, page.value))
const mutation = useMutation()

watch(page, load, { immediate: true })

async function save(text: string) {
  await mutation.run(async () => {
    if (editing.value) await postsApi.updateComment(editing.value.id, text)
    else await postsApi.addComment(props.postId, text)
    editing.value = null
    formKey.value++
    if (page.value === 0) await load()
    else page.value = 0
  }, ui.comments.saved)
}

async function edit(id: number) {
  await mutation.run(async () => {
    editing.value = await postsApi.comment(id)
  }, '')
}

async function remove() {
  await mutation.run(async () => {
    if (removing.value === null) return
    await postsApi.removeComment(removing.value)
    removing.value = null
    editing.value = null
    await load()
    if (!data.value?.content.length && page.value > 0) page.value--
  }, ui.comments.deleted)
}

function confirmRemove(id: number) {
  removing.value = id
  mutation.error.value = null
}

function changePage(value: number) {
  page.value = value
  editing.value = null
}
</script>
<template>
  <section class="stack">
    <h2>{{ ui.comments.title }}</h2>
    <FormNotice
      :error="!editing && !removing ? mutation.error.value : null"
      :success="mutation.success.value"
    /><TextEntryForm
      v-if="auth.authenticated && !editing"
      :key="formKey"
      :busy="mutation.busy.value"
      :error="mutation.error.value"
      @save="save"
    /><RouterLink
      v-else-if="!auth.authenticated"
      :to="{ path: '/login', query: { redirect: `/community/${postId}` } }"
      >{{ ui.comments.signIn }}</RouterLink
    ><RequestState
      :loading="loading"
      :error="error"
      :empty="data?.content.length === 0"
      @retry="load"
    />
    <article v-for="comment in data?.content" :key="comment.id" class="panel">
      <p>
        <strong>{{ comment.author.displayName }}</strong> · {{ date(comment.createdAt) }}
      </p>
      <TextEntryForm
        v-if="editing?.id === comment.id"
        :key="`edit-${comment.id}`"
        editing
        :initial-text="editing.text"
        :busy="mutation.busy.value"
        :error="mutation.error.value"
        @save="save"
        @cancel="editing = null"
      />
      <p v-else class="prose">{{ comment.text }}</p>
      <div v-if="auth.canEdit(comment.author.id)" class="actions">
        <button class="btn-secondary" :disabled="mutation.busy.value" @click="edit(comment.id)">
          {{ ui.common.change }}</button
        ><button
          class="btn-secondary danger"
          :disabled="mutation.busy.value"
          @click="confirmRemove(comment.id)"
        >
          {{ ui.common.delete }}
        </button>
      </div>
      <ReactionBar target="comments" :target-id="comment.id" />
    </article>
    <PageNav
      :page="page"
      :has-next="!!data && page + 1 < data.totalPages"
      :total-pages="data?.totalPages"
      :disabled="loading || mutation.busy.value"
      @change="changePage"
    /><ConfirmDelete
      :open="removing !== null"
      :busy="mutation.busy.value"
      :error="mutation.error.value?.message"
      :label="ui.resources.comment"
      @cancel="removing = null"
      @confirm="remove"
    />
  </section>
</template>
