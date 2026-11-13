<script setup lang="ts">
import { ru as ui } from '@/locales/ru'
import { ref, computed, watch } from 'vue'
import { imageUrl } from '@/utils/format'

const props = defineProps<{ src?: string | null; alt: string }>()
const failed = ref(false)
const url = computed(() => imageUrl(props.src))

watch(
  () => props.src,
  () => {
    failed.value = false
  },
)
</script>
<template>
  <img
    v-if="url && !failed"
    :src="url"
    :alt="alt"
    loading="lazy"
    referrerpolicy="no-referrer"
    @error="failed = true"
  />
  <div
    v-else
    class="image-placeholder muted"
    role="img"
    :aria-label="ui.images.unavailableAlt(alt)"
  >
    {{ ui.images.unavailable }}
  </div>
</template>
<style scoped>
.image-placeholder {
  display: grid;
  place-items: center;
  background: var(--color-bg-soft);
  min-height: 100px;
}
</style>
