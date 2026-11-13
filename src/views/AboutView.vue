<script setup lang="ts">
import { ru as ui } from '@/locales/ru'
import { onMounted } from 'vue'
import { motorcyclesApi } from '@/api/motorcycles'
import { technologiesApi } from '@/api/technologies'
import { useRequest } from '@/composables/useRequest'
import RequestState from '@/components/ui/RequestState.vue'

const top = useRequest(motorcyclesApi.top)
const technologies = useRequest(technologiesApi.list)

onMounted(() => {
  void top.load()
  void technologies.load()
})
</script>
<template>
  <div class="content-wrap">
    <div class="content-main">
      <h2>{{ ui.about.title }}</h2>
      <span class="sub">{{ ui.about.subtitle }}</span>

      <p>
        {{ ui.about.intro }}
      </p>

      <p>
        {{ ui.about.technologyDescription }}
      </p>

      <div class="highlight">
        <strong>{{ ui.about.engineeringTitle }}</strong
        ><br />
        {{ ui.about.engineeringDescription }}
      </div>

      <p>
        {{ ui.about.assistantsDescription }}
      </p>
    </div>

    <aside class="sidebar-box">
      <h4>{{ ui.about.top }}</h4>
      <RequestState
        :loading="top.loading.value"
        :error="top.error.value"
        :empty="top.data.value?.length === 0"
        @retry="top.load"
      />
      <ul>
        <li v-for="(moto, index) in top.data.value" :key="moto.id">
          <span class="num">{{ index + 1 }}</span
          ><RouterLink :to="`/motorcycles/${moto.id}`"
            >{{ moto.brand }} {{ moto.model }} — {{ moto.horsepower }}
            {{ ui.motorcycles.horsepowerUnit }}</RouterLink
          >
        </li>
      </ul>
      <hr class="divider-line" />
      <p>
        <a href="/photo-credits.html">{{ ui.images.credits }}</a>
      </p>
      <h4>{{ ui.admin.technologies }}</h4>
      <RequestState
        :loading="technologies.loading.value"
        :error="technologies.error.value"
        :empty="technologies.data.value?.length === 0"
        @retry="technologies.load"
      />
      <ul>
        <li v-for="technology in technologies.data.value" :key="technology.id">
          <RouterLink :to="`/technologies/${technology.id}`">{{ technology.name }}</RouterLink>
        </li>
      </ul>
    </aside>
  </div>
</template>

<style scoped src="../assets/css/pages/about.css"></style>
<style scoped src="../assets/css/layout/sidebar.css"></style>
