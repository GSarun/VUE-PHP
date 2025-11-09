import { defineStore } from 'pinia';
import { ref, computed } from 'vue'; // ยังคงใช้ ref และ computed ได้

// ใช้ defineStore เพื่อสร้าง Pinia store
// 'auth' คือ ID ที่ไม่ซ้ำกันของ store นี้
export const useAuthStore = defineStore('auth', () => {
  // 1. State: เปรียบเสมือน data() ใน component
  // ข้อมูล user ที่ดึงมาจาก localStorage ตอนเริ่มต้น
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'));

  // 2. Getters: เปรียบเสมือน computed properties
  // ตรวจสอบสถานะการ login จาก state ของ user
  const isAuthenticated = computed(() => !!user.value);

  // 3. Actions: เปรียบเสมือน methods ใน component
  // ใช้สำหรับเปลี่ยนแปลง state
  function login(userData) {
    user.value = userData;
    localStorage.setItem('user', JSON.stringify(userData));
  }

  function logout() {
    user.value = null;
    localStorage.removeItem('user');
  }

  // คืนค่า state, getters, และ actions เพื่อให้ component อื่นๆ เรียกใช้ได้
  return { user, isAuthenticated, login, logout };
});
