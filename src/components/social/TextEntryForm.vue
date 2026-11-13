<script setup lang="ts">
import { ru as ui } from '@/locales/ru'
import { ref } from 'vue'
import type { ApiError } from '@/types/api'
import FormField from '@/components/ui/FormField.vue'
import FormNotice from '@/components/ui/FormNotice.vue'

const props = defineProps<{
  initialText?: string
  initialRating?: number
  review?: boolean
  busy: boolean
  error?: ApiError | null
  editing?: boolean
}>()

defineEmits<{ save: [text: string, rating: number]; cancel: [] }>()

const text = ref(props.initialText ?? '')
const rating = ref(props.initialRating ?? 5)
</script>
<template>
  <form @submit.prevent="$emit('save', text, rating)">
    <fieldset :disabled="busy">
      <FormField
        v-if="review"
        v-slot="field"
        :label="ui.fields.rating"
        :error="error?.fieldErrors.rating"
        ><select
          :id="field.id"
          v-model="rating"
          :aria-invalid="field.invalid"
          :aria-describedby="field.describedby"
        >
          <option v-for="value in 5" :key="value" :value="value">
            {{ value }} {{ ui.reviews.ratingTotal }}
          </option>
        </select></FormField
      >
      <FormField
        v-slot="field"
        :label="review ? ui.fields.review : ui.fields.comment"
        :error="error?.fieldErrors.text"
      >
        <textarea
          :id="field.id"
          v-model="text"
          required
          maxlength="10000"
          :aria-invalid="field.invalid"
          :aria-describedby="field.describedby"
        ></textarea>
      </FormField>
      <FormNotice :error="error" />
      <div class="actions">
        <button class="btn-secondary">
          {{ busy ? ui.common.saving : editing ? ui.common.save : ui.common.publish }}</button
        ><button v-if="editing" class="btn-secondary" type="button" @click="$emit('cancel')">
          {{ ui.common.cancel }}
        </button>
      </div>
    </fieldset>
  </form>
</template>
