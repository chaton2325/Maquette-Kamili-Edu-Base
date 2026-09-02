import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { persistencePlugin } from './stores/persistPlugin'
import './charts/setup'
import './assets/styles/main.css'

const app = createApp(App)
const pinia = createPinia()
pinia.use(persistencePlugin)

app.use(pinia)
app.use(router)

app.mount('#app')
