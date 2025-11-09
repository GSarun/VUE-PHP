<template>
  <div class="container">
    <div class="header">
      <h1>Welcome, {{ authStore.user?.username || 'User' }}!</h1>
      <button @click="handleLogout" class="logout-button">Logout</button>
    </div>

    <div class="content">
      <h2>Posts from API</h2>
      <div v-if="loading" class="loading-state">Loading posts...</div>
      <div v-if="error" class="error-state">{{ error }}</div>
      <div v-if="!loading && posts.length > 0" class="post-list">
        <div v-for="post in posts" :key="post.id" class="post-card">
          <h3>{{ post.title }}</h3>
          <p>{{ post.body }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const posts = ref([]);
const loading = ref(true);
const error = ref(null);
const router = useRouter();
const authStore = useAuthStore();

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};

onMounted(async () => {
  try {
    // ใช้ axios.get เพื่อส่ง GET request ไปยัง API
    const response = await axios.get('http://localhost:8080/api/test.php');
    posts.value = response.data; // ข้อมูลที่ได้จะอยู่ใน response.data
  } catch (err) {
    // จัดการ error ที่อาจเกิดขึ้น
    error.value = 'Failed to fetch data. Please try again later.';
    console.error(err);
  } finally {
    // เมื่อเสร็จสิ้น (ไม่ว่าจะสำเร็จหรือล้มเหลว) ให้หยุดการ loading
    loading.value = false;
  }
});
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica,
    Arial, sans-serif;
  background-color: #f9fafb;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
}

h1 {
  font-size: 1.8rem;
  color: #111827;
}

h2 {
  font-size: 1.5rem;
  color: #374151;
  margin-bottom: 1rem;
}

.content {
  margin-top: 1rem;
}

.post-list {
  display: grid;
  gap: 1.5rem;
}

.post-card {
  background: #ffffff;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.post-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

.post-card h3 {
  margin-top: 0;
  margin-bottom: 0.75rem;
  color: #1f2937;
}

.logout-button {
  padding: 0.5rem 1rem;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease-in-out;
}

.logout-button:hover {
  background-color: #d32f2f;
}

.loading-state,
.error-state {
  text-align: center;
  padding: 2rem;
  color: #6b7280;
}
.error-state {
  color: #ef4444;
}
</style>