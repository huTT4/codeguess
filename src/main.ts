import { createApp } from 'vue'
import { createPinia } from 'pinia'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import router from './router'
import './style.css'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(hljsVuePlugin)
app.mount('#app')
