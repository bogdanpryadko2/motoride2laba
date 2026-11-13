<script setup lang="ts">
import { ru as ui } from '@/locales/ru'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { motorcyclesApi } from '@/api/motorcycles'
import { useRequest } from '@/composables/useRequest'
import { price } from '@/utils/format'
import RequestState from '@/components/ui/RequestState.vue'
import ContentImage from '@/components/ui/ContentImage.vue'
import FavoriteButton from '@/components/FavoriteButton.vue'
import ReviewsSection from '@/components/social/ReviewsSection.vue'

const route = useRoute()
const id = Number(route.params.id)
const { data, loading, error, load } = useRequest(() => motorcyclesApi.get(id))

onMounted(load)
</script>
<template>
  <section class="page">
    <RouterLink to="/motorcycles">{{ ui.motorcycles.back }}</RouterLink
    ><RequestState :loading="loading" :error="error" @retry="load" /><template v-if="data"
      ><h1>{{ data.brand }} {{ data.model }}</h1>
      <div class="detail-grid">
        <ContentImage
          :src="data.imageUrl"
          :alt="`${data.brand} ${data.model}`"
          class="content-image"
        />
        <div>
          <p v-if="data.badge" class="hero-tag">{{ data.badge }}</p>
          <dl class="specs">
            <dt>{{ ui.motorcycles.engine }}</dt>
            <dd>{{ data.engineCc }} {{ ui.motorcycles.engineUnit }}</dd>
            <dt>{{ ui.motorcycles.horsepower }}</dt>
            <dd>{{ data.horsepower }} {{ ui.motorcycles.horsepowerUnit }}</dd>
            <dt>{{ ui.motorcycles.price }}</dt>
            <dd>{{ price(data.price) }}</dd>
            <dt>{{ ui.fields.category }}</dt>
            <dd>
              <RouterLink :to="`/categories/${data.categorySlug}`">{{
                data.categoryName
              }}</RouterLink>
            </dd>
          </dl>
          <FavoriteButton :motorcycle-id="id" />
        </div>
      </div>
      <p v-if="data.shortDescription">{{ data.shortDescription }}</p>
      <p class="prose">{{ data.description }}</p>
      <section>
        <h2>{{ ui.admin.technologies }}</h2>
        <div class="actions">
          <RouterLink
            v-for="(name, index) in data.technologies"
            :key="name"
            :to="`/technologies/${data.technologyIds[index]}`"
            >{{ name }}</RouterLink
          >
          <p v-if="!data.technologies.length" class="muted">{{ ui.motorcycles.noTechnologies }}</p>
        </div>
      </section>
      <ReviewsSection :motorcycle-id="id"
    /></template>
  </section>
</template>
