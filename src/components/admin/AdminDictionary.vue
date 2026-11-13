<script setup lang="ts">
import { ru as ui } from '@/locales/ru'
import { ref, reactive, onMounted } from 'vue'
import { categoriesApi } from '@/api/categories'
import { technologiesApi } from '@/api/technologies'
import { useRequest, useMutation } from '@/composables/useRequest'
import type { Category, Technology } from '@/types/api'
import FormField from '@/components/ui/FormField.vue'
import RequestState from '@/components/ui/RequestState.vue'
import FormNotice from '@/components/ui/FormNotice.vue'
import ConfirmDelete from '@/components/ui/ConfirmDelete.vue'

const props = defineProps<{ kind: 'categories' | 'technologies' }>()
const category = props.kind === 'categories'
const editing = ref<number | null>(null)
const formOpen = ref(false)
const removing = ref<number | null>(null)
const form = reactive({ name: '', slug: '', description: '' })
const { data, loading, error, load } = useRequest<Technology[] | Category[]>(() =>
  category ? categoriesApi.list() : technologiesApi.list(),
)
const mutation = useMutation()

onMounted(load)

function edit(item?: Technology | Category) {
  editing.value = item?.id ?? null
  Object.assign(form, {
    name: item?.name || '',
    slug: item && 'slug' in item ? item.slug : '',
    description: item?.description || '',
  })
  mutation.error.value = null
  mutation.success.value = ''
  formOpen.value = true
}

async function save() {
  await mutation.run(async () => {
    const body = { name: form.name, description: form.description.trim() || null }
    if (category) {
      const request = { ...body, slug: form.slug }
      if (editing.value) await categoriesApi.update(editing.value, request)
      else await categoriesApi.create(request)
    } else if (editing.value) await technologiesApi.update(editing.value, body)
    else await technologiesApi.create(body)
    formOpen.value = false
    await load()
  }, ui.admin.recordSaved)
}

async function remove() {
  await mutation.run(async () => {
    if (removing.value === null) return
    await (category ? categoriesApi.remove(removing.value) : technologiesApi.remove(removing.value))
    removing.value = null
    await load()
  }, ui.admin.recordDeleted)
}

function confirmRemove(id: number) {
  removing.value = id
  mutation.error.value = null
}
</script>
<template>
  <section class="stack">
    <div class="actions">
      <h2>{{ category ? ui.admin.categories : ui.admin.technologies }}</h2>
      <button class="btn-secondary" :disabled="mutation.busy.value" @click="edit()">
        {{ ui.common.add }}
      </button>
    </div>
    <form v-if="formOpen" class="panel" @submit.prevent="save">
      <fieldset :disabled="mutation.busy.value">
        <h3>{{ editing ? ui.common.edit : ui.admin.newRecord }}</h3>
        <FormField
          v-slot="field"
          :label="ui.fields.name"
          :error="mutation.error.value?.fieldErrors.name"
          ><input
            :id="field.id"
            v-model="form.name"
            required
            maxlength="100"
            :aria-invalid="field.invalid"
            :aria-describedby="field.describedby" /></FormField
        ><FormField
          v-if="category"
          v-slot="field"
          :label="ui.fields.slug"
          :error="mutation.error.value?.fieldErrors.slug"
          ><input
            :id="field.id"
            v-model="form.slug"
            required
            maxlength="100"
            pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
            :aria-invalid="field.invalid"
            :aria-describedby="field.describedby" /></FormField
        ><FormField
          v-slot="field"
          :label="ui.fields.description"
          :error="mutation.error.value?.fieldErrors.description"
        >
          <textarea
            :id="field.id"
            v-model="form.description"
            maxlength="10000"
            :aria-invalid="field.invalid"
            :aria-describedby="field.describedby"
          ></textarea></FormField
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
        <span>{{ item.name }}</span>
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
    <ConfirmDelete
      :open="removing !== null"
      :busy="mutation.busy.value"
      :error="mutation.error.value?.message"
      @cancel="removing = null"
      @confirm="remove"
    />
  </section>
</template>
