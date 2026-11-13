<script setup lang="ts">
import { ru as ui } from '@/locales/ru'

defineProps<{ page: number; hasNext: boolean; totalPages?: number; disabled?: boolean }>()
defineEmits<{ change: [page: number] }>()
</script>
<template>
  <nav class="pagination" :aria-label="ui.pagination.label">
    <button
      type="button"
      class="btn-secondary"
      :disabled="disabled || page <= 0"
      @click="$emit('change', page - 1)"
    >
      {{ ui.pagination.previous }}
    </button>
    <span>{{ ui.pagination.pageLabel(page + 1, totalPages) }}</span>
    <button
      type="button"
      class="btn-secondary"
      :disabled="disabled || !hasNext"
      @click="$emit('change', page + 1)"
    >
      {{ ui.pagination.next }}
    </button>
  </nav>
</template>
