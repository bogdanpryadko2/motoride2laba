<script setup lang="ts">
import { ru as ui } from '@/locales/ru'
import ConfirmDialog from './ConfirmDialog.vue'

defineProps<{ open: boolean; busy?: boolean; error?: string; all?: boolean }>()
defineEmits<{ cancel: []; confirm: [] }>()
</script>
<template>
  <ConfirmDialog
    :open="open"
    :busy="busy"
    :error="error"
    :title="ui.confirmation.logoutTitle"
    :message="all ? ui.confirmation.logoutAllMessage : ui.confirmation.logoutMessage"
    :confirm-label="ui.confirmation.logoutAction"
    :pending-label="ui.common.loggingOut"
    @cancel="$emit('cancel')"
    @confirm="$emit('confirm')"
  />
</template>
