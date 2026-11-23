<script setup lang="ts">
import { ru as ui } from '@/locales/ru'
import { computed, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useMutation } from '@/composables/useMutation'
import ConfirmLogout from './ui/ConfirmLogout.vue'

const auth = useAuthStore()
const router = useRouter()
const { busy, error, run } = useMutation()
const logoutOpen = ref(false)
const navItems = computed(() => [
  { to: '/', label: ui.nav.home },
  { to: '/motorcycles', label: ui.nav.catalog },
  { to: '/news', label: ui.nav.news },
  { to: '/community', label: ui.nav.community },
  { to: '/about', label: ui.nav.about },
  ...(auth.authenticated
    ? [
        { to: '/favorites', label: ui.nav.favorites },
        { to: '/profile', label: ui.nav.profile },
        { to: '/community/new', label: ui.nav.write },
      ]
    : auth.status === 'pending'
      ? []
      : [
          { to: '/login', label: ui.nav.login },
          { to: '/register', label: ui.nav.register },
        ]),
  ...(auth.isAdmin ? [{ to: '/admin', label: ui.nav.admin }] : []),
])

async function logout() {
  await run(async () => {
    await auth.logout()
    logoutOpen.value = false
    await router.push('/')
  }, '')
}
</script>
<template>
  <nav class="nav" :aria-label="ui.nav.label">
    <RouterLink to="/" class="nav-brand">{{ ui.common.brand }}</RouterLink>
    <div class="nav-links">
      <RouterLink
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="nav-btn"
        exact-active-class="active"
        >{{ item.label }}</RouterLink
      >
      <button
        v-if="auth.authenticated"
        class="nav-btn"
        :disabled="busy || auth.busy"
        @click="logoutOpen = true"
      >
        {{ ui.nav.logout }}
      </button>
    </div>
  </nav>
  <ConfirmLogout
    :open="logoutOpen"
    :busy="busy || auth.busy"
    :error="error?.message"
    @cancel="logoutOpen = false"
    @confirm="logout"
  />
</template>
<style scoped src="../assets/css/components/nav.css"></style>
