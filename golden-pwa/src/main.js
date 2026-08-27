import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/main.css'
import { installLanguageObserver } from './composables/useLanguage'

document.documentElement.classList.add('dark')

createApp(App).use(router).mount('#app')
installLanguageObserver()
