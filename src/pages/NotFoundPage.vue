<script setup lang="ts">
import router from "@/router";

function goToLogin() {
  router.push("/");
}
</script>

<template>
  <div class="not-found">
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <div class="not-found__actions">
      <button class="actions__button" @click="goToLogin">Login Page</button>
      <button class="actions__button" @click="router.back()">Go Back</button>
    </div>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  height: 100vh;
}

.not-found__actions {
  display: flex;
  gap: 10px;
}

.actions__button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.actions__button:hover {
  background-color: #0056b3;
}
</style>
