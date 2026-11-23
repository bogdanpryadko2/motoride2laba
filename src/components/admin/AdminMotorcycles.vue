<script setup lang="ts">
import { ru as ui } from '@/locales/ru'
import { ref, watch } from 'vue'
import type { Motorcycle, MotorcycleRequest } from '@/types/api'
import { motorcyclesApi } from '@/api/motorcycles'
import { useRequest } from '@/composables/useRequest'
import { useMutation } from '@/composables/useMutation'
import MotorcycleForm from './MotorcycleForm.vue'
import RequestState from '@/components/ui/RequestState.vue'
import FormNotice from '@/components/ui/FormNotice.vue'
import ConfirmDelete from '@/components/ui/ConfirmDelete.vue'
import PageNav from '@/components/ui/PageNav.vue'
import FormField from '@/components/ui/FormField.vue'

const page = ref(0)
const search = ref('')
const editing = ref<Motorcycle>()
const formOpen = ref(false)
const removing = ref<number | null>(null)
const { data, loading, error, load } = useRequest(() =>
  motorcyclesApi.list({ page: page.value, size: 10, search: search.value }),
)
const mutation = useMutation()

watch(page, load, { immediate: true })

async function edit(id: number) {
  await mutation.run(async () => {
    editing.value = await motorcyclesApi.get(id)
    formOpen.value = true
  }, '')
}

async function save(body: MotorcycleRequest) {
  await mutation.run(async () => {
    if (editing.value) await motorcyclesApi.update(editing.value.id, body)
    else await motorcyclesApi.create(body)
    formOpen.value = false
    await load()
  }, ui.motorcycles.saved)
}

async function remove() {
  await mutation.run(async () => {
    if (removing.value === null) return
    await motorcyclesApi.remove(removing.value)
    removing.value = null
    await load()
    if (!data.value?.content.length && page.value > 0) page.value--
  }, ui.motorcycles.deleted)
}

function create() {
  editing.value = undefined
  mutation.error.value = null
  mutation.success.value = ''
  formOpen.value = true
}

async function filter() {
  if (page.value === 0) await load()
  else page.value = 0
}

function confirmRemove(id: number) {
  removing.value = id
  mutation.error.value = null
}
</script>
<template>
  <section class="stack">
    <div class="actions">
      <h2>{{ ui.admin.motorcycles }}</h2>
      <button class="btn-secondary" :disabled="mutation.busy.value" @click="create">
        {{ ui.motorcycles.add }}
      </button>
    </div>
    <MotorcycleForm
      v-if="formOpen"
      :key="editing?.id ?? 'new'"
      :initial="editing"
      :busy="mutation.busy.value"
      :error="mutation.error.value"
      @save="save"
      @cancel="formOpen = false"
    /><FormNotice
      :error="!formOpen && !removing ? mutation.error.value : null"
      :success="mutation.success.value"
    />
    <form @submit.prevent="filter">
      <FormField v-slot="field" :label="ui.motorcycles.search"
        ><input :id="field.id" v-model="search" type="search" /></FormField
      ><button class="btn-secondary" :disabled="loading">{{ ui.common.find }}</button>
    </form>
    <RequestState
      :loading="loading"
      :error="error"
      :empty="data?.content.length === 0"
      @retry="load"
    />
    <ul class="resource-list">
      <li v-for="moto in data?.content" :key="moto.id" class="resource-row panel">
        <RouterLink :to="`/motorcycles/${moto.id}`">{{ moto.brand }} {{ moto.model }}</RouterLink>
        <div class="actions">
          <button class="btn-secondary" :disabled="mutation.busy.value" @click="edit(moto.id)">
            {{ ui.common.change }}</button
          ><button
            class="btn-secondary danger"
            :disabled="mutation.busy.value"
            @click="confirmRemove(moto.id)"
          >
            {{ ui.common.delete }}
          </button>
        </div>
      </li>
    </ul>
    <PageNav
      :page="page"
      :has-next="!!data && page + 1 < data.totalPages"
      :total-pages="data?.totalPages"
      :disabled="loading || mutation.busy.value"
      @change="page = $event"
    /><ConfirmDelete
      :open="removing !== null"
      :busy="mutation.busy.value"
      :error="mutation.error.value?.message"
      :label="ui.resources.motorcycle"
      @cancel="removing = null"
      @confirm="remove"
    />
  </section>
</template>
