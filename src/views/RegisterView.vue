<template>
  <div class="register-wrap">
    <h2>Создать аккаунт</h2>
    <p class="register-sub">
      Присоединяйся к сообществу райдеров<br />
      или <a href="#" @click.prevent="emit('switchPage', 'auth')">войди в существующий</a>
    </p>

    <form @submit.prevent="register">
      <div class="form-group">
        <label for="reg-name">Имя и фамилия</label>
        <input type="text" id="reg-name" v-model="name" placeholder="Алексей Райдеров" />
      </div>

      <div class="form-group">
        <label for="reg-email">Email</label>
        <input type="email" id="reg-email" v-model="email" placeholder="rider@moto.ru" />
      </div>

      <div class="form-group">
        <label for="reg-password">Пароль</label>
        <input type="password" id="reg-password" v-model="password" placeholder="минимум 8 символов" />
      </div>

      <div class="form-group">
        <label for="reg-password-confirm">Подтверждение пароля</label>
        <input type="password" id="reg-password-confirm" v-model="passwordConfirm" placeholder="повторите пароль" />
      </div>

      <button type="submit" class="btn-primary">Зарегистрироваться</button>
    </form>

    <div class="auth-footer">
      Уже есть аккаунт? <a href="#" @click.prevent="emit('switchPage', 'auth')">Войти</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  switchPage: [page: 'auth']
}>()

const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')

function register() {
  window.alert('Аккаунт создан! Добро пожаловать!')
}
</script>