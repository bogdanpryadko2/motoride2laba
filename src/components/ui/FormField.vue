<script setup lang="ts">
import { useId } from 'vue'

const props = defineProps<{ label: string; error?: string }>()
const id = useId()
</script>
<template>
  <div class="form-group">
    <label :for="id">{{ label }}</label>
    <slot :id="id" :invalid="!!props.error" :describedby="error ? `${id}-error` : undefined" />
    <p v-if="error" :id="`${id}-error`" class="field-error" role="alert">{{ error }}</p>
  </div>
</template>
