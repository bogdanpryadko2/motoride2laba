<script setup lang="ts">
import { ru as ui } from '@/locales/ru'
import ConfirmDialog from './ConfirmDialog.vue'

defineProps<{ open: boolean; busy?: boolean; error?: string; label?: string }>()
defineEmits<{ cancel: []; confirm: [] }>()
</script>
<template>
  <ConfirmDialog
    :open="open"
    :busy="busy"
    :error="error"
    :title="ui.confirmation.deleteTitle(label || ui.resources.record)"
    :message="ui.confirmation.deleteMessage"
    :confirm-label="ui.common.delete"
    :pending-label="ui.common.deleting"
    @cancel="$emit('cancel')"
    @confirm="$emit('confirm')"
  />
</template>
