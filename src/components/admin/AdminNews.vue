<script setup lang="ts">
import { ru as ui } from '@/locales/ru'
import { ref, reactive, watch } from 'vue'
import { newsApi } from '@/api/news'
import { useRequest, useMutation } from '@/composables/useRequest'
import type { News } from '@/types/api'
import FormField from '@/components/ui/FormField.vue'
import RequestState from '@/components/ui/RequestState.vue'
import FormNotice from '@/components/ui/FormNotice.vue'
import ConfirmDelete from '@/components/ui/ConfirmDelete.vue'
import PageNav from '@/components/ui/PageNav.vue'

const page = ref(0)
const editing = ref<number | null>(null)
const formOpen = ref(false)
const removing = ref<number | null>(null)
const form = reactive({ title: '', content: '', imageUrl: '', publishedAt: '' })
const { data, loading, error, load } = useRequest(() => newsApi.list(page.value, 10))
const mutation = useMutation()

watch(page, load, { immediate: true })

function edit(item?: News) {
  editing.value = item?.id ?? null
  Object.assign(form, {
    title: item?.title || '',
    content: item?.content || '',
    imageUrl: item?.imageUrl || '',
    publishedAt: item?.publishedAt || new Date().toISOString().slice(0, 19),
  })
  mutation.error.value = null
  mutation.success.value = ''
  formOpen.value = true
}

async function save() {
  await mutation.run(async () => {
    const body = {
      ...form,
      imageUrl: form.imageUrl.trim() || null,
      publishedAt: form.publishedAt.length === 16 ? `${form.publishedAt}:00` : form.publishedAt,
    }
    if (editing.value) await newsApi.update(editing.value, body)
    else await newsApi.create(body)
    formOpen.value = false
    await load()
  }, ui.news.saved)
}

async function remove() {
  await mutation.run(async () => {
    if (removing.value === null) return
    await newsApi.remove(removing.value)
    removing.value = null
    await load()
    if (!data.value?.length && page.value > 0) page.value--
  }, ui.news.deleted)
}

function confirmRemove(id: number) {
  removing.value = id
  mutation.error.value = null
}
</script>
<template>
  <section class="stack">
    <div class="actions">
      <h2>{{ ui.nav.news }}</h2>
      <button class="btn-secondary" :disabled="mutation.busy.value" @click="edit()">
        {{ ui.news.add }}
      </button>
    </div>
    <form v-if="formOpen" class="panel" @submit.prevent="save">
      <fieldset :disabled="mutation.busy.value">
        <FormField
          v-slot="field"
          :label="ui.fields.title"
          :error="mutation.error.value?.fieldErrors.title"
          ><input
            :id="field.id"
            v-model="form.title"
            required
            maxlength="200"
            :aria-invalid="field.invalid"
            :aria-describedby="field.describedby" /></FormField
        ><FormField
          v-slot="field"
          :label="ui.fields.content"
          :error="mutation.error.value?.fieldErrors.content"
        >
          <textarea
            :id="field.id"
            v-model="form.content"
            required
            maxlength="100000"
            :aria-invalid="field.invalid"
            :aria-describedby="field.describedby"
          ></textarea></FormField
        ><FormField
          v-slot="field"
          :label="ui.fields.optionalImageUrl"
          :error="mutation.error.value?.fieldErrors.imageUrl"
          ><input
            :id="field.id"
            v-model="form.imageUrl"
            maxlength="500"
            :aria-invalid="field.invalid"
            :aria-describedby="field.describedby" /></FormField
        ><FormField
          v-slot="field"
          :label="ui.fields.publishedAt"
          :error="mutation.error.value?.fieldErrors.publishedAt"
          ><input
            :id="field.id"
            v-model="form.publishedAt"
            type="datetime-local"
            step="1"
            required
            :aria-invalid="field.invalid"
            :aria-describedby="field.describedby" /></FormField
        ><FormNotice :error="mutation.error.value" />
        <div class="actions">
          <button class="btn-secondary">{{ ui.common.save }}</button
          ><button type="button" class="btn-secondary" @click="formOpen = false">
            {{ ui.common.cancel }}
          </button>
        </div>
      </fieldset>
    </form>
    <FormNotice
      :error="!formOpen && !removing ? mutation.error.value : null"
      :success="mutation.success.value"
    /><RequestState :loading="loading" :error="error" :empty="data?.length === 0" @retry="load" />
    <ul class="resource-list">
      <li v-for="item in data" :key="item.id" class="resource-row panel">
        <RouterLink :to="`/news/${item.id}`">{{ item.title }}</RouterLink>
        <div class="actions">
          <button class="btn-secondary" :disabled="mutation.busy.value" @click="edit(item)">
            {{ ui.common.change }}</button
          ><button
            class="btn-secondary danger"
            :disabled="mutation.busy.value"
            @click="confirmRemove(item.id)"
          >
            {{ ui.common.delete }}
          </button>
        </div>
      </li>
    </ul>
    <PageNav
      :page="page"
      :has-next="data?.length === 10"
      :disabled="loading || mutation.busy.value"
      @change="page = $event"
    /><ConfirmDelete
      :open="removing !== null"
      :busy="mutation.busy.value"
      :error="mutation.error.value?.message"
      :label="ui.resources.news"
      @cancel="removing = null"
      @confirm="remove"
    />
  </section>
</template>
