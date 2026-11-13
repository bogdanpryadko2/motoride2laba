<script setup lang="ts">
import { ru as ui } from '@/locales/ru'
import { reactive, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { postsApi } from '@/api/posts'
import { useAuthStore } from '@/stores/auth'
import { useRequest, useMutation } from '@/composables/useRequest'
import type { PostRequest } from '@/types/api'
import FormField from '@/components/ui/FormField.vue'
import FormNotice from '@/components/ui/FormNotice.vue'
import RequestState from '@/components/ui/RequestState.vue'
import MotorcyclePicker from '@/components/MotorcyclePicker.vue'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const id = Number(route.params.id) || null
const ready = ref(!id)
const form = reactive<PostRequest>({ title: '', content: '', imageUrl: null, motorcycleId: null })
const initial = useRequest(async () => {
  if (!id) return
  const post = await postsApi.get(id)
  if (!auth.canEdit(post.author.id)) {
    await router.replace('/forbidden')
    return
  }
  Object.assign(form, {
    title: post.title,
    content: post.content,
    imageUrl: post.imageUrl,
    motorcycleId: post.motorcycleId,
  })
  ready.value = true
})
const { busy, error, run } = useMutation()

onMounted(() => {
  if (id) void initial.load()
})

async function save() {
  await run(async () => {
    const body = { ...form, imageUrl: form.imageUrl?.trim() || null }
    const post = id ? await postsApi.update(id, body) : await postsApi.create(body)

    await router.push(`/community/${post.id}`)
  })
}
</script>
<template>
  <section class="page form-width">
    <h1>{{ id ? ui.posts.edit : ui.posts.new }}</h1>
    <RequestState
      :loading="initial.loading.value"
      :error="initial.error.value"
      @retry="initial.load"
    />
    <form v-if="ready" @submit.prevent="save">
      <fieldset :disabled="busy">
        <FormField v-slot="field" :label="ui.fields.title" :error="error?.fieldErrors.title"
          ><input
            :id="field.id"
            v-model="form.title"
            required
            maxlength="200"
            :aria-invalid="field.invalid"
            :aria-describedby="field.describedby" /></FormField
        ><FormField v-slot="field" :label="ui.fields.text" :error="error?.fieldErrors.content">
          <textarea
            :id="field.id"
            v-model="form.content"
            required
            maxlength="50000"
            :aria-invalid="field.invalid"
            :aria-describedby="field.describedby"
          ></textarea></FormField
        ><FormField v-slot="field" :label="ui.posts.imageUrl" :error="error?.fieldErrors.imageUrl"
          ><input
            :id="field.id"
            v-model="form.imageUrl"
            maxlength="500"
            :placeholder="ui.images.urlPlaceholder"
            :aria-invalid="field.invalid"
            :aria-describedby="field.describedby" /></FormField
        ><MotorcyclePicker
          v-model="form.motorcycleId"
          :disabled="busy"
          :error="error?.fieldErrors.motorcycleId"
        /><FormNotice :error="error" /><button class="btn-primary">
          {{ busy ? ui.common.saving : ui.posts.save }}
        </button>
      </fieldset>
    </form>
  </section>
</template>
