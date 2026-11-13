<script setup lang="ts">
import { ru as ui } from '@/locales/ru'
import { RouterLink } from 'vue-router'
import type { MotorcycleSummary } from '@/types/api'
import { price } from '@/utils/format'
import ContentImage from './ui/ContentImage.vue'

defineProps<{ motorcycle: MotorcycleSummary }>()
</script>
<template>
  <article class="moto-card">
    <RouterLink :to="`/motorcycles/${motorcycle.id}`" class="card-link">
      <ContentImage
        :src="motorcycle.imageUrl"
        :alt="`${motorcycle.brand} ${motorcycle.model}`"
        class="card-image"
      />
      <h3>{{ motorcycle.brand }} {{ motorcycle.model }}</h3>
    </RouterLink>
    <div class="spec">
      {{ motorcycle.engineCc }} {{ ui.motorcycles.engineSeparator }} {{ motorcycle.horsepower }}
      {{ ui.motorcycles.horsepowerUnit }}
    </div>
    <p>{{ motorcycle.categoryName }}</p>
    <p>{{ price(motorcycle.price) }}</p>
    <span v-if="motorcycle.badge" class="badge">{{ motorcycle.badge }}</span>
  </article>
</template>
<style scoped src="../assets/css/components/cards.css"></style>
