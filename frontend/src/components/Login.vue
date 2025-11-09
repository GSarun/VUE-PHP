<template>
  <div class="login-container">
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
      <p v-if="successMessage" class="success">{{ successMessage }}</p>
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
const authStore = useAuthStore();
const handleLogin = async () => {

  error.value = null;

  try {
    const response = await axios.post('http://localhost:8080/api/login.php', {
      username: username.value,
      password: password.value,
    });

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
.login-container { max-width: 400px; margin: 50px auto; padding: 2rem; border: 1px solid #ccc; border-radius: 8px; }
.form-group { margin-bottom: 1rem; }
label { display: block; margin-bottom: 0.5rem; }
input { width: 100%; padding: 0.5rem; box-sizing: border-box; }
button { width: 100%; padding: 0.75rem; background-color: #42b883; color: white; border: none; border-radius: 4px; cursor: pointer; }
button:hover { background-color: #369a6e; }
.error { color: red; margin-top: 1rem; }
.success { color: green; margin-top: 1rem; }
</style>