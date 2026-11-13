<script setup lang="ts">
import { ru as ui } from '@/locales/ru'
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import AppNavbar from './components/AppNavbar.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const route = useRoute()
const allowed = computed(
  () => !route.meta.auth || (auth.authenticated && (!route.meta.admin || auth.isAdmin)),
)
</script>
<template>
  <div class="app">
    <a href="#page-container" class="skip-link">{{ ui.common.skipContent }}</a>
    <AppNavbar />
    <p v-if="auth.status === 'pending'" role="status">{{ ui.session.restoring }}</p>
    <div v-else-if="auth.status === 'unavailable'" role="alert" class="error-box">
      {{ auth.sessionError }}
      <button class="btn-secondary" @click="auth.initialize(true)">{{ ui.session.restore }}</button>
    </div>
    <main id="page-container" tabindex="-1">
      <RouterView v-if="auth.status !== 'pending' && allowed" v-slot="{ Component }">
        <component :is="Component" :key="route.path" />
      </RouterView>
      <p v-else-if="auth.status === 'unavailable'" role="status">
        {{ ui.session.protectedPending }}
      </p>
      <p v-else-if="auth.status !== 'pending'" role="alert">
        {{ ui.session.continuePrompt }}
        <RouterLink :to="{ path: '/login', query: { redirect: route.fullPath } }">{{
          ui.session.signInPrompt
        }}</RouterLink
        >.
      </p>
    </main>
  </div>
</template>
