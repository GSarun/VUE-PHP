import { createApp } from 'vue'
import './assets/main.css' // Import global styles
import App from './App.vue'
import router from './router' // 1. Import router ที่เราสร้าง
import { createPinia } from 'pinia' // Import Pinia

const app = createApp(App)
app.use(createPinia()) // Use Pinia for state management
app.use(router) // 2. บอกให้ Vue App ใช้งาน router
app.mount('#app')