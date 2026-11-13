<script setup lang="ts">
import { ru as ui } from '@/locales/ru'
import type { ApiError } from '@/types/api'

defineProps<{ loading?: boolean; error?: ApiError | null; empty?: boolean }>()
defineEmits<{ retry: [] }>()
</script>
<template>
  <p v-if="loading" role="status" class="status">{{ ui.common.loading }}</p>
  <div v-else-if="error" role="alert" class="error-box">
    <p>{{ error.message }}</p>
    <button class="btn-secondary" type="button" @click="$emit('retry')">
      {{ ui.common.retry }}
    </button>
  </div>
  <p v-else-if="empty" class="status">{{ ui.common.empty }}</p>
</template>
