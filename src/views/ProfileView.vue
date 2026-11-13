<script setup lang="ts">
import { ru as ui } from '@/locales/ru'
import { onMounted, ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useRequest, useMutation } from '@/composables/useRequest'
import { passwordError } from '@/utils/format'
import FormField from '@/components/ui/FormField.vue'
import FormNotice from '@/components/ui/FormNotice.vue'
import RequestState from '@/components/ui/RequestState.vue'
import ConfirmLogout from '@/components/ui/ConfirmLogout.vue'

const auth = useAuthStore()
const router = useRouter()
const name = ref(auth.user?.displayName || '')
const password = reactive({ currentPassword: '', newPassword: '' })
const localError = ref('')
const passwordOpen = ref(false)
const profile = useRequest(async () => {
  await auth.loadProfile()
  name.value = auth.user?.displayName || ''
})
const update = useMutation()
const change = useMutation()
const exit = useMutation()
const logoutMode = ref<boolean | null>(null)

onMounted(profile.load)

async function saveName() {
  await update.run(() => auth.updateProfile(name.value), ui.profile.nameUpdated)
}

async function changePassword() {
  localError.value = passwordError(password.newPassword)
  if (localError.value) return
  await change.run(async () => {
    await auth.changePassword(password)
    await router.replace({ path: '/login', query: { changed: '1' } })
  })
}

async function logout() {
  if (logoutMode.value === null) return
  const all = logoutMode.value

  await exit.run(async () => {
    await auth.logout(all)
    logoutMode.value = null
    await router.push('/')
  })
}
</script>
<template>
  <section class="page form-width">
    <h1>{{ ui.nav.profile }}</h1>
    <RequestState
      :loading="profile.loading.value"
      :error="profile.error.value"
      @retry="profile.load"
    />
    <p>{{ auth.user?.email }} · {{ auth.user?.role }}</p>
    <form class="panel" @submit.prevent="saveName">
      <fieldset :disabled="update.busy.value">
        <h2>{{ ui.profile.displayName }}</h2>
        <FormField
          v-slot="field"
          :label="ui.fields.displayName"
          :error="update.error.value?.fieldErrors.displayName"
          ><input
            :id="field.id"
            v-model="name"
            required
            maxlength="100"
            autocomplete="nickname"
            :aria-invalid="field.invalid"
            :aria-describedby="field.describedby" /></FormField
        ><FormNotice :error="update.error.value" :success="update.success.value" /><button
          class="btn-secondary"
        >
          {{ ui.common.save }}
        </button>
      </fieldset>
    </form>
    <button
      type="button"
      class="btn-secondary"
      :aria-expanded="passwordOpen"
      aria-controls="password-form"
      @click="passwordOpen = !passwordOpen"
    >
      {{ passwordOpen ? ui.profile.hidePassword : ui.profile.changePassword }}
    </button>
    <form v-if="passwordOpen" id="password-form" class="panel" @submit.prevent="changePassword">
      <fieldset :disabled="change.busy.value || auth.busy">
        <h2>{{ ui.profile.changePassword }}</h2>
        <p class="muted">{{ ui.profile.passwordHint }}</p>
        <FormField
          v-slot="field"
          :label="ui.fields.currentPassword"
          :error="change.error.value?.fieldErrors.currentPassword"
          ><input
            :id="field.id"
            v-model="password.currentPassword"
            type="password"
            required
            autocomplete="current-password"
            :aria-invalid="field.invalid"
            :aria-describedby="field.describedby" /></FormField
        ><FormField
          v-slot="field"
          :label="ui.fields.newPassword"
          :error="localError || change.error.value?.fieldErrors.newPassword"
          ><input
            :id="field.id"
            v-model="password.newPassword"
            type="password"
            required
            autocomplete="new-password"
            :aria-invalid="field.invalid"
            :aria-describedby="field.describedby" /></FormField
        ><FormNotice :error="change.error.value" /><button class="btn-secondary">
          {{ ui.profile.changePassword }}
        </button>
      </fieldset>
    </form>
    <div class="actions">
      <button
        class="btn-secondary"
        :disabled="exit.busy.value || auth.busy"
        @click="logoutMode = false"
      >
        {{ ui.nav.logout }}</button
      ><button
        class="btn-secondary danger"
        :disabled="exit.busy.value || auth.busy"
        @click="logoutMode = true"
      >
        {{ ui.profile.logoutAll }}
      </button>
    </div>
    <ConfirmLogout
      :open="logoutMode !== null"
      :all="logoutMode === true"
      :busy="exit.busy.value || auth.busy"
      :error="exit.error.value?.message"
      @cancel="logoutMode = null"
      @confirm="logout"
    />
  </section>
</template>
