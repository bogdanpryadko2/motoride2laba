<script setup lang="ts">
import { ru as ui } from '@/locales/ru'
import { watch } from 'vue'
import { reactionsApi } from '@/api/reactions'
import { reactionOptions } from '@/config/reactions'
import { useAuthStore } from '@/stores/auth'
import { useRequest, useMutation } from '@/composables/useRequest'
import type { ReactionKind, ReactionTarget } from '@/types/api'
import FormNotice from '@/components/ui/FormNotice.vue'
import RequestState from '@/components/ui/RequestState.vue'

const props = defineProps<{ target: ReactionTarget; targetId: number }>()
const auth = useAuthStore()
const { data, loading, error, load } = useRequest(async () => {
  const [counts, own] = await Promise.all([
    reactionsApi.counts(props.target, props.targetId),
    auth.authenticated
      ? reactionsApi.own(props.target, props.targetId)
      : Promise.resolve({ kind: null }),
  ])
  return { counts, own: own.kind }
})
const mutation = useMutation()

watch(() => [props.target, props.targetId, auth.user?.id], load, { immediate: true })

async function react(kind: ReactionKind) {
  await mutation.run(async () => {
    if (data.value?.own === kind) await reactionsApi.remove(props.target, props.targetId)
    else await reactionsApi.set(props.target, props.targetId, kind)
    await load()
  }, ui.reactions.saved)
}
</script>
<template>
  <div class="reactions" :aria-label="ui.reactions.title">
    <template v-if="data">
      <template v-for="item in reactionOptions" :key="item.kind">
        <button
          v-if="auth.authenticated"
          class="btn-secondary"
          :aria-pressed="data.own === item.kind"
          :aria-label="`${item.label} ${data.counts[item.kind] ?? 0}`"
          :title="item.label"
          :disabled="loading || mutation.busy.value"
          @click="react(item.kind)"
        >
          <span aria-hidden="true">{{ item.emoji }}</span>
          <span>{{ data.counts[item.kind] ?? 0 }}</span>
        </button>
        <span
          v-else
          class="reaction-summary muted"
          :aria-label="`${item.label} ${data.counts[item.kind] ?? 0}`"
          :title="item.label"
        >
          <span aria-hidden="true">{{ item.emoji }}</span>
          <span>{{ data.counts[item.kind] ?? 0 }}</span>
        </span>
      </template>
    </template>
    <RequestState :loading="loading" :error="error" @retry="load" />
    <FormNotice :error="mutation.error.value" :success="mutation.success.value" />
  </div>
</template>
