import { ref, computed } from 'vue';

// นี่คือ State Management แบบง่ายๆ โดยไม่ใช้ Pinia
// ถ้าโปรเจกต์ใหญ่ขึ้นแนะนำให้ใช้ Pinia

const user = ref(JSON.parse(localStorage.getItem('user') || 'null'));

export function useAuthStore() {
  const isAuthenticated = computed(() => !!user.value);

  function login(userData) {
    user.value = userData;
    localStorage.setItem('user', JSON.stringify(userData));
  }

  function logout() {
    user.value = null;
    localStorage.removeItem('user');
  }

  return {
    user,
    isAuthenticated,
    login,
    logout,
  };
}
