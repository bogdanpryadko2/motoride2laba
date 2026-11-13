import './assets/css/base/reset.css'
import './assets/css/base/variables.css'
import './assets/css/base/global.css'
import './assets/css/components/forms.css'
import './assets/css/components/buttons.css'
import './assets/css/pages/home.css'
import './assets/css/components/application.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

createApp(App).use(createPinia()).use(router).mount('#app')
