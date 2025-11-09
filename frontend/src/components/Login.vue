<template>
  <div class="login-container">
    <!-- ใช้ form-container class จาก global style -->
    <form @submit.prevent="handleLogin">
      <h1>Login</h1>
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router'; // 1. Import useRouter
import { useAuthStore } from '../stores/auth'; // Import store

const username = ref('');
const password = ref('');
const error = ref(null);
const router = useRouter(); // 2. สร้าง instance ของ router นอก handleLogin
const handleLogin = async () => {

  error.value = null;

  try {
    const response = await axios.post('http://localhost:8080/api/login.php', {
      username: username.value,
      password: password.value,
    });

    const authStore = useAuthStore();
    // 3. เมื่อ Login สำเร็จ ให้เรียก action ใน store และเปลี่ยนหน้า
    authStore.login(response.data.user); // สมมติว่า API คืนค่า user object
    router.push('/');

  } catch (err) {
    error.value = err.response?.data?.message || 'Login failed. Please check your credentials.';
    console.error(err);
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

form {
  max-width: 400px;
  width: 100%;
  margin: 50px auto;
  padding: var(--spacing-4);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
}
.form-group { margin-bottom: var(--spacing-2); }
label { display: block; margin-bottom: var(--spacing-1); }
input { width: 100%; padding: var(--spacing-1); box-sizing: border-box; border: 1px solid var(--color-border); border-radius: 4px; }
button { width: 100%; padding: 0.75rem; background-color: var(--color-primary); color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: 500; }
button:hover { background-color: var(--color-primary-hover); }

/* .error class is now global in main.css */

</style>