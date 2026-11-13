<script setup lang="ts">
import { ru as ui } from '@/locales/ru'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { safeRedirect } from '@/utils/format'

const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

async function retry() {
  await auth.initialize(true)
  if (auth.status !== 'unavailable') await router.replace(safeRedirect(route.query.redirect))
}
</script>
<template>
  <section class="page">
    <template v-if="route.meta.status === 'unavailable'"
      ><h1>{{ ui.status.sessionTitle }}</h1>
      <p>{{ ui.status.sessionMessage }}</p>
      <button class="btn-secondary" @click="retry">{{ ui.common.retry }}</button></template
    >
    <template v-else-if="route.meta.status === 'forbidden'"
      ><h1>{{ ui.status.forbiddenTitle }}</h1>
      <p>{{ ui.status.forbiddenMessage }}</p></template
    >
    <template v-else
      ><h1>{{ ui.status.notFoundTitle }}</h1>
      <p>{{ ui.status.notFoundMessage }}</p></template
    >
    <RouterLink to="/">{{ ui.common.home }}</RouterLink>
  </section>
</template>
