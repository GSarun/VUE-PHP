import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login.vue';
import Home from '../components/Home.vue';
import { useAuthStore } from '../stores/auth';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/',
    name: 'Home',
    component: Home, // กำหนดให้หน้าแรก (/) เป็นหน้า Home ที่แสดงข้อมูล
    meta: { requiresAuth: true } // ระบุว่าหน้านี้ต้อง Login
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !authStore.isAuthenticated) {
    // ถ้าหน้าที่กำลังจะไปต้อง Login แต่ยังไม่ได้ Login ให้ไปหน้า Login
    next('/login');
  } else {
    next(); // ไปยังหน้าที่ต้องการตามปกติ
  }
});

export default router;