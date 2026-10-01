<script setup lang="ts">
import { RouterView } from 'vue-router'

import AppNavbar from './components/AppNavbar.vue'
</script>

<template>
  <div class="app">
    <AppNavbar />

    <div id="page-container">
      <RouterView />
    </div>
  </div>
</template>
