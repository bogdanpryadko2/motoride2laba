<script setup lang="ts">
import { ru as ui } from '@/locales/ru'
import { reactive, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useMutation } from '@/composables/useMutation'
import { passwordError } from '@/utils/format'
import FormField from '@/components/ui/FormField.vue'
import FormNotice from '@/components/ui/FormNotice.vue'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()
const form = reactive({ displayName: '', email: '', password: '' })
const confirm = ref('')
const localErrors = ref<Record<string, string>>({})
const { busy, error, run } = useMutation()

async function register() {
  localErrors.value = {
    password: passwordError(form.password),
    confirm: confirm.value !== form.password ? ui.auth.passwordMismatch : '',
  }
  if (Object.values(localErrors.value).some(Boolean)) return
  await run(async () => {
    await auth.register(form)
    await router.replace('/')
  })
}
</script>
<template>
  <div class="register-wrap">
    <h2>{{ ui.auth.createAccount }}</h2>
    <p class="register-sub">
      {{ ui.auth.registerIntro }}<br />{{ ui.common.or }}
      <RouterLink :to="{ path: '/login', query: route.query }">{{
        ui.auth.existingAccountLink
      }}</RouterLink>
    </p>
    <form @submit.prevent="register">
      <fieldset :disabled="busy || auth.busy">
        <FormField
          v-slot="field"
          :label="ui.fields.displayName"
          :error="error?.fieldErrors.displayName"
          ><input
            :id="field.id"
            v-model="form.displayName"
            autocomplete="nickname"
            required
            maxlength="100"
            :aria-invalid="field.invalid"
            :aria-describedby="field.describedby"
        /></FormField>
        <FormField v-slot="field" :label="ui.fields.email" :error="error?.fieldErrors.email"
          ><input
            :id="field.id"
            v-model="form.email"
            type="email"
            autocomplete="email"
            required
            maxlength="254"
            :aria-invalid="field.invalid"
            :aria-describedby="field.describedby"
        /></FormField>
        <FormField
          v-slot="field"
          :label="ui.auth.passwordLabel"
          :error="localErrors.password || error?.fieldErrors.password"
          ><input
            :id="field.id"
            v-model="form.password"
            type="password"
            autocomplete="new-password"
            required
            :aria-invalid="field.invalid"
            :aria-describedby="field.describedby"
        /></FormField>
        <FormField
          v-slot="field"
          :label="ui.fields.passwordConfirmation"
          :error="localErrors.confirm"
          ><input
            :id="field.id"
            v-model="confirm"
            type="password"
            autocomplete="new-password"
            required
            :aria-invalid="field.invalid"
            :aria-describedby="field.describedby"
        /></FormField>
        <FormNotice :error="error" />
        <button type="submit" class="btn-primary">
          {{ busy ? ui.auth.registering : ui.auth.register }}
        </button>
      </fieldset>
    </form>
  </div>
</template>
<style scoped src="../assets/css/pages/register.css"></style>
