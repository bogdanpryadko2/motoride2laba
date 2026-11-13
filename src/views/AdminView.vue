<script setup lang="ts">
import { ru as ui } from '@/locales/ru'
import { ref } from 'vue'
import AdminMotorcycles from '@/components/admin/AdminMotorcycles.vue'
import AdminDictionary from '@/components/admin/AdminDictionary.vue'
import AdminNews from '@/components/admin/AdminNews.vue'

const tab = ref('motorcycles')
const tabs = [
  { key: 'motorcycles', label: ui.admin.motorcycles },
  { key: 'categories', label: ui.admin.categories },
  { key: 'technologies', label: ui.admin.technologies },
  { key: 'news', label: ui.nav.news },
]
</script>
<template>
  <section class="page">
    <h1>{{ ui.admin.title }}</h1>
    <nav class="actions" :aria-label="ui.admin.sections">
      <button
        v-for="item in tabs"
        :key="item.key"
        class="btn-secondary"
        :aria-pressed="tab === item.key"
        @click="tab = item.key"
      >
        {{ item.label }}
      </button>
    </nav>
    <AdminMotorcycles v-if="tab === 'motorcycles'" /><AdminDictionary
      v-else-if="tab === 'categories' || tab === 'technologies'"
      :key="tab"
      :kind="tab"
    /><AdminNews v-else />
  </section>
</template>
