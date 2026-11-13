<script setup lang="ts">
import { ru as ui } from '@/locales/ru'
import { computed, reactive, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { motorcyclesApi } from '@/api/motorcycles'
import { categoriesApi } from '@/api/categories'
import { useRequest } from '@/composables/useRequest'
import { usePageQuery } from '@/composables/usePageQuery'
import MotoCard from '@/components/MotoCard.vue'
import RequestState from '@/components/ui/RequestState.vue'
import PageNav from '@/components/ui/PageNav.vue'
import FormField from '@/components/ui/FormField.vue'

const route = useRoute()
const router = useRouter()
const { page, changePage } = usePageQuery()
const stringParam = (value: unknown) => (typeof value === 'string' ? value : '')
const query = computed(() => ({
  page: page.value,
  size: 12,
  search: stringParam(route.query.search),
  category: stringParam(route.query.category),
  sort: ['newest', 'hp_desc', 'price_asc', 'price_desc'].includes(stringParam(route.query.sort))
    ? stringParam(route.query.sort)
    : 'newest',
}))
const filters = reactive({ search: '', category: '', sort: 'newest' })
const { data, loading, error, load } = useRequest(() => motorcyclesApi.list(query.value))
const categories = useRequest(categoriesApi.list)

watch(
  query,
  () => {
    Object.assign(filters, query.value)
    void load()
  },
  { immediate: true },
)
onMounted(categories.load)

function search() {
  return router.push({
    query: {
      search: filters.search.trim() || undefined,
      category: filters.category || undefined,
      sort: filters.sort,
      page: undefined,
    },
  })
}
</script>
<template>
  <section class="page">
    <h1>{{ ui.catalog.title }}</h1>
    <form class="panel" @submit.prevent="search">
      <div class="form-grid">
        <FormField v-slot="field" :label="ui.catalog.search"
          ><input :id="field.id" v-model="filters.search" type="search" maxlength="200"
        /></FormField>
        <FormField v-slot="field" :label="ui.fields.category"
          ><select :id="field.id" v-model="filters.category">
            <option value="">{{ ui.catalog.allCategories }}</option>
            <option
              v-for="category in categories.data.value"
              :key="category.id"
              :value="category.slug"
            >
              {{ category.name }}
            </option>
          </select></FormField
        >
        <FormField v-slot="field" :label="ui.catalog.sort"
          ><select :id="field.id" v-model="filters.sort">
            <option value="newest">{{ ui.catalog.newest }}</option>
            <option value="hp_desc">{{ ui.catalog.horsepower }}</option>
            <option value="price_asc">{{ ui.catalog.priceAscending }}</option>
            <option value="price_desc">{{ ui.catalog.priceDescending }}</option>
          </select></FormField
        >
        <div class="actions">
          <button class="btn-secondary" :disabled="loading">{{ ui.common.apply }}</button
          ><RouterLink to="/motorcycles">{{ ui.common.reset }}</RouterLink>
        </div>
      </div>
      <RequestState
        :loading="categories.loading.value"
        :error="categories.error.value"
        @retry="categories.load"
      />
    </form>
    <RequestState
      :loading="loading"
      :error="error"
      :empty="data?.content.length === 0"
      @retry="load"
    />
    <template v-if="data"
      ><p class="muted">{{ ui.catalog.found }} {{ data.totalElements }}</p>
      <div class="moto-grid">
        <MotoCard v-for="moto in data.content" :key="moto.id" :motorcycle="moto" /></div
    ></template>
    <PageNav
      :page="page"
      :has-next="!!data && page + 1 < data.totalPages"
      :total-pages="data?.totalPages"
      :disabled="loading"
      @change="changePage"
    />
  </section>
</template>
