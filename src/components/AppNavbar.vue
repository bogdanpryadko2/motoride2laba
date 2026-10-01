<script setup lang="ts">
import { RouterLink } from 'vue-router'

const navItems = [
  { to: '/', label: 'Главная' },
  { to: '/about', label: 'О мотоциклах' },
  { to: '/login', label: 'Вход' },
  { to: '/register', label: 'Регистрация' },
]
</script>

<template>
  <nav class="nav">
    <RouterLink to="/" class="nav-brand">MotoRide</RouterLink>

    <RouterLink
      v-for="item in navItems"
      :key="item.to"
      :to="item.to"
      class="nav-btn"
      exact-active-class="active"
    >
      {{ item.label }}
    </RouterLink>
  </nav>
</template>

<style scoped src="../assets/css/components/nav.css"></style>
