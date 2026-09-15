<template>
  <div class="auth-wrap">
    <h2>Добро пожаловать</h2>
    <p class="auth-sub">
      Войди в мир скорости<br />
      или <a href="#" @click.prevent="emit('switchPage', 'register')">создай аккаунт</a>
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
      <a href="#" @click.prevent="emit('switchPage', 'register')">Регистрация</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  switchPage: [page: 'register']
}>()

const email = ref('demo@moto.ru')
const password = ref('moto2025')

function notify(message: string) {
  window.alert(message)
}

function login() {
  window.alert('Добро пожаловать, райдер!')
}
</script>