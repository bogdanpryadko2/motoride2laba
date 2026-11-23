<script setup lang="ts">
import { ru as ui } from '@/locales/ru'
import { ref, watch } from 'vue'
import { reviewsApi } from '@/api/reviews'
import { useRequest } from '@/composables/useRequest'
import { useMutation } from '@/composables/useMutation'
import { useAuthStore } from '@/stores/auth'
import { date } from '@/utils/format'
import type { Review } from '@/types/api'
import RequestState from '@/components/ui/RequestState.vue'
import PageNav from '@/components/ui/PageNav.vue'
import ConfirmDelete from '@/components/ui/ConfirmDelete.vue'
import FormNotice from '@/components/ui/FormNotice.vue'
import TextEntryForm from './TextEntryForm.vue'
import ReactionBar from './ReactionBar.vue'

const props = defineProps<{ motorcycleId: number }>()
const auth = useAuthStore()
const page = ref(0)
const editing = ref<Review | null>(null)
const removing = ref<number | null>(null)
const formKey = ref(0)
const { data, loading, error, load } = useRequest(() =>
  reviewsApi.list(props.motorcycleId, page.value, 10),
)
const mutation = useMutation()

watch(page, load, { immediate: true })

async function save(text: string, rating: number) {
  await mutation.run(async () => {
    if (editing.value) await reviewsApi.update(editing.value.id, { text, rating })
    else await reviewsApi.create(props.motorcycleId, { text, rating })
    editing.value = null
    formKey.value++
    if (page.value === 0) await load()
    else page.value = 0
  }, ui.reviews.saved)
}

async function edit(id: number) {
  await mutation.run(async () => {
    editing.value = await reviewsApi.get(id)
  }, '')
}

async function remove() {
  await mutation.run(async () => {
    if (removing.value === null) return
    await reviewsApi.remove(removing.value)
    removing.value = null
    editing.value = null
    await load()
    if (!data.value?.length && page.value > 0) page.value--
  }, ui.reviews.deleted)
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
    <h2>{{ ui.reviews.title }}</h2>
    <FormNotice
      :error="!editing && !removing ? mutation.error.value : null"
      :success="mutation.success.value"
    />
    <TextEntryForm
      v-if="auth.authenticated && !editing"
      :key="formKey"
      review
      :busy="mutation.busy.value"
      :error="mutation.error.value"
      @save="save"
    />
    <RouterLink
      v-else-if="!auth.authenticated"
      :to="{ path: '/login', query: { redirect: `/motorcycles/${motorcycleId}` } }"
      >{{ ui.reviews.signIn }}</RouterLink
    >
    <RequestState :loading="loading" :error="error" :empty="data?.length === 0" @retry="load" />
    <article v-for="review in data" :key="review.id" class="panel">
      <p>
        <strong>{{ review.authorName }}</strong> · {{ review.rating }} / 5
      </p>
      <time class="muted" :datetime="review.createdAt">{{ date(review.createdAt) }}</time>
      <TextEntryForm
        v-if="editing?.id === review.id"
        :key="`edit-${review.id}`"
        review
        editing
        :initial-text="editing.text"
        :initial-rating="editing.rating"
        :busy="mutation.busy.value"
        :error="mutation.error.value"
        @save="save"
        @cancel="editing = null"
      />
      <p v-else class="prose">{{ review.text }}</p>
      <div v-if="auth.canEdit(review.authorId)" class="actions">
        <button class="btn-secondary" :disabled="mutation.busy.value" @click="edit(review.id)">
          {{ ui.common.change }}</button
        ><button
          class="btn-secondary danger"
          :disabled="mutation.busy.value"
          @click="confirmRemove(review.id)"
        >
          {{ ui.common.delete }}
        </button>
      </div>
      <ReactionBar target="reviews" :target-id="review.id" />
    </article>
    <PageNav
      :page="page"
      :has-next="data?.length === 10"
      :disabled="loading || mutation.busy.value"
      @change="changePage"
    />
    <ConfirmDelete
      :open="removing !== null"
      :busy="mutation.busy.value"
      :error="mutation.error.value?.message"
      :label="ui.resources.review"
      @cancel="removing = null"
      @confirm="remove"
    />
  </section>
</template>
