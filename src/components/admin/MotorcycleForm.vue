<script setup lang="ts">
import { ru as ui } from '@/locales/ru'
import { reactive, onMounted } from 'vue'
import type { MotorcycleRequest, ApiError } from '@/types/api'
import { categoriesApi } from '@/api/categories'
import { technologiesApi } from '@/api/technologies'
import { useRequest } from '@/composables/useRequest'
import { useMutation } from '@/composables/useMutation'
import { uploadImage } from '@/api/images'
import FormField from '@/components/ui/FormField.vue'
import FormNotice from '@/components/ui/FormNotice.vue'
import RequestState from '@/components/ui/RequestState.vue'

const props = defineProps<{ initial?: MotorcycleRequest; busy: boolean; error?: ApiError | null }>()
const emit = defineEmits<{ save: [body: MotorcycleRequest]; cancel: [] }>()
type MotorcycleForm = Omit<MotorcycleRequest, 'engineCc' | 'horsepower' | 'price'> & {
  engineCc: number | null
  horsepower: number | null
  price: number | null
}

const form = reactive<MotorcycleForm>({
  brand: props.initial?.brand ?? '',
  model: props.initial?.model ?? '',
  engineCc: props.initial?.engineCc ?? null,
  horsepower: props.initial?.horsepower ?? null,
  price: props.initial?.price ?? null,
  badge: props.initial?.badge ?? '',
  shortDescription: props.initial?.shortDescription ?? '',
  description: props.initial?.description ?? '',
  imageUrl: props.initial?.imageUrl ?? '',
  categoryId: props.initial?.categoryId ?? 0,
  technologyIds: [...(props.initial?.technologyIds ?? [])],
})
const dictionaries = useRequest(async () => {
  const [categories, technologies] = await Promise.all([
    categoriesApi.list(),
    technologiesApi.list(),
  ])
  return { categories, technologies }
})
const upload = useMutation()

async function selectImage(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  await upload.run(async () => {
    form.imageUrl = await uploadImage(file)
  }, ui.images.uploaded)
  input.value = ''
}

onMounted(dictionaries.load)

const textFields = [
  { key: 'brand', label: ui.fields.brand, max: 100, required: true },
  { key: 'model', label: ui.fields.model, max: 100, required: true },
  { key: 'badge', label: ui.fields.badge, max: 100, required: false },
  { key: 'shortDescription', label: ui.fields.shortDescription, max: 255, required: false },
  { key: 'imageUrl', label: ui.fields.imageUrl, max: 500, required: true },
] as const
const numbers = [
  { key: 'engineCc', label: ui.fields.engineCc, min: 1, max: 10000, step: 1 },
  { key: 'horsepower', label: ui.fields.horsepower, min: 1, max: 2000, step: 1 },
  { key: 'price', label: ui.fields.price, min: 0, max: 9999999999.99, step: 0.01 },
] as const

function submit() {
  const { engineCc, horsepower, price } = form
  if (engineCc === null || horsepower === null || price === null) return
  emit('save', {
    ...form,
    engineCc,
    horsepower,
    price,
    badge: form.badge?.trim() || null,
    shortDescription: form.shortDescription?.trim() || null,
  })
}
</script>
<template>
  <form class="panel" @submit.prevent="submit">
    <fieldset :disabled="busy || upload.busy.value">
      <h2>{{ initial ? ui.motorcycles.edit : ui.motorcycles.new }}</h2>
      <FormField v-slot="field" :label="ui.images.upload">
        <input :id="field.id" type="file" accept="image/png,image/jpeg" @change="selectImage" />
      </FormField>
      <FormNotice :error="upload.error.value" :success="upload.success.value" />
      <div class="form-grid">
        <FormField
          v-for="item in textFields"
          :key="item.key"
          v-slot="field"
          :label="item.label"
          :error="error?.fieldErrors[item.key]"
          ><input
            :id="field.id"
            v-model="form[item.key]"
            :required="item.required"
            :maxlength="item.max"
            :aria-invalid="field.invalid"
            :aria-describedby="field.describedby" /></FormField
        ><FormField
          v-for="item in numbers"
          :key="item.key"
          v-slot="field"
          :label="item.label"
          :error="error?.fieldErrors[item.key]"
          ><input
            :id="field.id"
            v-model.number="form[item.key]"
            type="number"
            required
            :min="item.min"
            :max="item.max"
            :step="item.step"
            :aria-invalid="field.invalid"
            :aria-describedby="field.describedby"
        /></FormField>
      </div>
      <FormField
        v-slot="field"
        :label="ui.fields.description"
        :error="error?.fieldErrors.description"
      >
        <textarea
          :id="field.id"
          v-model="form.description"
          required
          maxlength="50000"
          :aria-invalid="field.invalid"
          :aria-describedby="field.describedby"
        ></textarea></FormField
      ><RequestState
        :loading="dictionaries.loading.value"
        :error="dictionaries.error.value"
        @retry="dictionaries.load"
      /><FormField v-slot="field" :label="ui.fields.category" :error="error?.fieldErrors.categoryId"
        ><select
          :id="field.id"
          v-model="form.categoryId"
          required
          :aria-invalid="field.invalid"
          :aria-describedby="field.describedby"
        >
          <option :value="0" disabled>{{ ui.motorcycles.selectCategory }}</option>
          <option
            v-for="category in dictionaries.data.value?.categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select></FormField
      ><FormField
        v-slot="field"
        :label="ui.fields.technologies"
        :error="error?.fieldErrors.technologyIds"
        ><select
          :id="field.id"
          v-model="form.technologyIds"
          multiple
          :aria-invalid="field.invalid"
          :aria-describedby="field.describedby"
        >
          <option
            v-for="technology in dictionaries.data.value?.technologies"
            :key="technology.id"
            :value="technology.id"
          >
            {{ technology.name }}
          </option>
        </select></FormField
      ><FormNotice :error="error" />
      <div class="actions">
        <button class="btn-secondary" :disabled="!dictionaries.data.value || !form.categoryId">
          {{ ui.common.save }}</button
        ><button type="button" class="btn-secondary" @click="$emit('cancel')">
          {{ ui.common.cancel }}
        </button>
      </div>
    </fieldset>
  </form>
</template>
