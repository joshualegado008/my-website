import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './global.css'

import App from './App.vue'
import { router } from './router' // Note: import with destructuring since you export as `export const router`

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
