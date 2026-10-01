<template>
  <div class="register-wrap">
    <h2>Создать аккаунт</h2>
    <p class="register-sub">
      Присоединяйся к сообществу райдеров<br />
      или <RouterLink to="/login">войди в существующий</RouterLink>
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
      Уже есть аккаунт? <RouterLink to="/login">Войти</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')

function register() {
  window.alert('Аккаунт создан! Добро пожаловать!')
}
</script>

<style scoped src="../assets/css/components/forms.css"></style>
<style scoped src="../assets/css/components/buttons.css"></style>
<style scoped src="../assets/css/pages/register.css"></style>
