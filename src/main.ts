import './assets/css/base/reset.css'
import './assets/css/base/variables.css'
import './assets/css/base/global.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
