<script setup lang="ts">
import { ru as ui } from '@/locales/ru'
import { ref, watch, nextTick, useId } from 'vue'

const props = defineProps<{
  open: boolean
  busy?: boolean
  error?: string
  title: string
  message: string
  confirmLabel: string
  pendingLabel: string
}>()
const emit = defineEmits<{ cancel: []; confirm: [] }>()
const dialog = ref<HTMLDialogElement>()
const titleId = useId()
let previous: HTMLElement | null = null

watch(
  () => props.open,
  async (open) => {
    await nextTick()
    if (open) {
      previous = document.activeElement as HTMLElement | null
      dialog.value?.showModal()
    } else {
      dialog.value?.close()
      previous?.focus()
    }
  },
)
</script>
<template>
  <dialog ref="dialog" :aria-labelledby="titleId" @cancel.prevent="!busy && emit('cancel')">
    <h2 :id="titleId">{{ title }}</h2>
    <p>{{ message }}</p>
    <p v-if="error" role="alert" class="error-box">{{ error }}</p>
    <div class="actions">
      <button autofocus class="btn-secondary" :disabled="busy" @click="emit('cancel')">
        {{ ui.common.cancel }}
      </button>
      <button class="btn-secondary danger" :disabled="busy" @click="emit('confirm')">
        {{ busy ? pendingLabel : confirmLabel }}
      </button>
    </div>
  </dialog>
</template>
