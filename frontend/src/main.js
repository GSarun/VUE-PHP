import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router' // 1. Import router ที่เราสร้าง

const app = createApp(App)
app.use(router) // 2. บอกให้ Vue App ใช้งาน router
app.mount('#app')