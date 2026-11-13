<script setup lang="ts">
import { ru as ui } from '@/locales/ru'
import { ref, onMounted } from 'vue'
import { motorcyclesApi } from '@/api/motorcycles'
import { useRequest } from '@/composables/useRequest'
import FormField from './ui/FormField.vue'
import RequestState from './ui/RequestState.vue'
import PageNav from './ui/PageNav.vue'

defineProps<{ error?: string; disabled?: boolean }>()

const model = defineModel<number | null>({ required: true })
const search = ref('')
const page = ref(0)
const {
  data,
  loading,
  error: loadError,
  load,
} = useRequest(() =>
  motorcyclesApi.list({ search: search.value.trim(), page: page.value, size: 10 }),
)

onMounted(load)

async function changePage(value: number) {
  page.value = value
  await load()
}
</script>
<template>
  <div class="panel">
    <FormField v-slot="field" :label="ui.posts.findMotorcycle"
      ><input
        :id="field.id"
        v-model="search"
        type="search"
        :disabled="disabled"
        @keydown.enter.prevent="changePage(0)" /></FormField
    ><button
      type="button"
      class="btn-secondary"
      :disabled="loading || disabled"
      @click="changePage(0)"
    >
      {{ ui.common.find }}</button
    ><RequestState :loading="loading" :error="loadError" @retry="load" /><FormField
      v-slot="field"
      :label="ui.posts.optionalMotorcycle"
      :error="error"
      ><select
        :id="field.id"
        v-model="model"
        :disabled="disabled"
        :aria-invalid="field.invalid"
        :aria-describedby="field.describedby"
      >
        <option :value="null">{{ ui.posts.noMotorcycle }}</option>
        <option v-if="model && !data?.content.some((moto) => moto.id === model)" :value="model">
          {{ ui.posts.selectedMotorcycle }}{{ model }}
        </option>
        <option v-for="moto in data?.content" :key="moto.id" :value="moto.id">
          {{ moto.brand }} {{ moto.model }}
        </option>
      </select></FormField
    ><PageNav
      :page="page"
      :has-next="!!data && page + 1 < data.totalPages"
      :disabled="loading || disabled"
      @change="changePage"
    />
  </div>
</template>
