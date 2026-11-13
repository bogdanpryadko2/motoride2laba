<script setup lang="ts">
import { ru as ui } from '@/locales/ru'
import { reactive } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useMutation } from '@/composables/useRequest'
import FormField from '@/components/ui/FormField.vue'
import FormNotice from '@/components/ui/FormNotice.vue'

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()
const form = reactive({ email: '', password: '' })
const { busy, error, run } = useMutation()

async function login() {
  await run(async () => {
    await auth.login(form)
    await router.replace('/')
  })
}
</script>
<template>
  <div class="auth-wrap">
    <h2>{{ ui.auth.welcome }}</h2>
    <p class="auth-sub">
      {{ ui.auth.loginIntro }}<br />{{ ui.common.or }}
      <RouterLink :to="{ path: '/register', query: route.query }">{{
        ui.auth.createAccountLink
      }}</RouterLink>
    </p>
    <p v-if="route.query.changed === '1'" role="status" class="success-box">
      {{ ui.auth.passwordChanged }}
    </p>
    <form @submit.prevent="login">
      <fieldset :disabled="busy || auth.busy">
        <FormField v-slot="field" :label="ui.fields.email" :error="error?.fieldErrors.email">
          <input
            :id="field.id"
            v-model="form.email"
            type="email"
            autocomplete="email"
            required
            maxlength="254"
            :aria-invalid="field.invalid"
            :aria-describedby="field.describedby"
          />
        </FormField>
        <FormField v-slot="field" :label="ui.fields.password" :error="error?.fieldErrors.password">
          <input
            :id="field.id"
            v-model="form.password"
            type="password"
            autocomplete="current-password"
            required
            :aria-invalid="field.invalid"
            :aria-describedby="field.describedby"
          />
        </FormField>
        <FormNotice :error="error" />
        <button type="submit" class="btn-primary">
          {{ busy ? ui.auth.loggingIn : ui.auth.login }}
        </button>
      </fieldset>
    </form>
  </div>
</template>
<style scoped src="../assets/css/pages/auth.css"></style>
