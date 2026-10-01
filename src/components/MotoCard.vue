<script setup lang="ts">
defineProps<{
  icon: string
  title: string
  spec: string
  description: string
  badge: string
}>()
</script>

<template>
  <article class="moto-card">
    <span class="icon">{{ icon }}</span>
    <h3>{{ title }}</h3>
    <div class="spec">{{ spec }}</div>
    <p>{{ description }}</p>
    <span class="badge">{{ badge }}</span>
  </article>
</template>

<style scoped src="../assets/css/components/cards.css"></style>
