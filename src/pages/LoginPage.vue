<script setup lang="ts">
import { ref } from "vue";
import router from "@/router";
import type { User } from "@/types";
import { fetchUsers } from "@/api";

const username = ref("");
const phone = ref("");
const error = ref("");
const isLoading = ref(false);

function validateUsername(event: Event) {
  const input = event.target as HTMLInputElement;
  let value = input.value.replace(/[^a-zA-Z_.]/g, ""); // Allow only letters, underscores, and dots
  value = value.replace(/([_.])\1+/g, "$1"); // Replace multiple underscores/dots with a single one
  input.value = value;
  username.value = value;
}

function validatePhone(event: Event) {
  const input = event.target as HTMLInputElement;
  let value = input.value.replace(/[^0-9+()\-\sx]/gi, ""); // Allow numbers, +, parentheses, dashes, spaces, and 'x'
  value = value.replace(/([ x\-()])\1+/gi, "$1"); // Replace multiple spaces, dashes, parentheses, or 'x' with a single one
  input.value = value;
  phone.value = value;
}

async function handleLogin() {
    isLoading.value = true;
  try {
    const users = await fetchUsers();
    const user = users.find(
      (u: User) => u.username === username.value && u.phone === phone.value,
    );

    if (!user) {
      error.value = "Login error";
      return;
    }

    localStorage.setItem("user", JSON.stringify(user));
    router.push("/todos");
  } catch {
    error.value = "Failed to fetch users. Please try again.";
  }
  finally {
    isLoading.value = false;
  }
}
</script>
<template>
  <div class="login-page">
    <div class="login-page__overlay">
      <div class="login-modal">
        <div class="login-modal__header">Description</div>
        <div class="login-modal__content">
          <div class="content__header">Description</div>
          <form class="content__form" @submit.prevent="handleLogin">
            <div class="form__fields">
              <input
                :value="username"
                @input="validateUsername"
                type="text"
                placeholder="Username"
                autocomplete="username"
                required
              />
              <input
                :value="phone"
                @input="validatePhone"
                type="tel"
                placeholder="Phone number"
                autocomplete="tel"
                required
              />
            </div>

            <div class="form__actions">
              <button class="login-button" type="submit">{{ isLoading ? "Logging in..." : "Login" }}</button>
              <p v-show="error" class="error-message">{{ error }}</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-page__overlay {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.login-modal {
  width: 447px;
  background-color: #c3c3c3;
  border-radius: 5px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding-bottom: 30px;
}

.login-modal__header {
  padding: 15px;
  text-align: center;
  background-color: #a5a5a5;
  font-size: 17px;
  color: #5f5f5f;
}

.login-modal__content {
  padding: 0 25px;
  display: flex;
  flex-direction: column;
}

.content__header {
  padding: 14px 0;
  font-size: 15px;
  color: #5f5f5f;
}

.content__form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.form__fields {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form__fields input {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid transparent;
  font-size: 17px;
  color: #353535;
  transition: border 0.2s;
}

.form__fields input:focus {
  outline: none;
  border-color: #519945;
}

.form__actions {
  width: 100%;
}

.login-button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #519945;
  color: white;
  font-size: 17px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.login-button:hover {
  background-color: #447f3a;
}
</style>
