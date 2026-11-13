<script setup lang="ts">
import type { ApiError } from '@/types/api'

defineProps<{ error?: ApiError | null; success?: string }>()
</script>
<template>
  <p v-if="error" role="alert" class="error-box">{{ error.message }}</p>
  <p v-if="success" role="status" class="success-box">{{ success }}</p>
</template>
