<template>
  <div class="auth-wrap">
    <h2>Добро пожаловать</h2>
    <p class="auth-sub">
      Войди в мир скорости<br />
      или <RouterLink to="/register">создай аккаунт</RouterLink>
    </p>

    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" placeholder="rider@moto.ru" />
      </div>

      <div class="form-group">
        <label for="password">Пароль</label>
        <input type="password" id="password" v-model="password" placeholder="введите пароль" />
      </div>

      <button type="submit" class="btn-primary">Войти</button>
    </form>

    <div class="auth-footer">
      <a href="#" @click.prevent="notify('Восстановление пароля')">Забыли пароль?</a>
      &nbsp;&nbsp;·&nbsp;&nbsp;
      <RouterLink to="/register">Регистрация</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const email = ref('demo@moto.ru')
const password = ref('moto2025')

function notify(message: string) {
  window.alert(message)
}

function login() {
  window.alert('Добро пожаловать, райдер!')
}
</script>

<style scoped src="../assets/css/components/forms.css"></style>
<style scoped src="../assets/css/components/buttons.css"></style>
<style scoped src="../assets/css/pages/auth.css"></style>
