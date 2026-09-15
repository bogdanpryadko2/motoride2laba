<script setup lang="ts">
import { ref } from 'vue'
import HomeView from './views/HomeView.vue'
import AboutView from './views/AboutView.vue'
import AuthView from './views/AuthView.vue'
import RegisterView from './views/RegisterView.vue'

type Page = 'home' | 'about' | 'auth' | 'register'

const navItems: { page: Page; label: string }[] = [
  { page: 'home', label: 'Главная' },
  { page: 'about', label: 'О мотоциклах' },
  { page: 'auth', label: 'Вход' },
  { page: 'register', label: 'Регистрация' },
]

const currentPage = ref<Page>('home')

function switchPage(page: Page) {
  currentPage.value = page
}
</script>

<template>
  <div class="app">
    <nav class="nav">
      <div class="nav-brand">MotoRide</div>
      <button
        v-for="item in navItems"
        :key="item.page"
        class="nav-btn"
        :class="{ active: currentPage === item.page }"
        @click="switchPage(item.page)"
      >
        {{ item.label }}
      </button>
    </nav>

    <div id="page-container">
      <HomeView v-if="currentPage === 'home'" @switchPage="switchPage" />
      <AboutView v-else-if="currentPage === 'about'" />
      <AuthView v-else-if="currentPage === 'auth'" @switchPage="switchPage" />
      <RegisterView v-else @switchPage="switchPage" />
    </div>
  </div>
</template>