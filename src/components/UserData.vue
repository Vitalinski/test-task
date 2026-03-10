<script setup lang="ts">
import type { User } from "@/types";

const { user } = defineProps<{
  user: User;
}>();
</script>

<template>
  <div class="user-data">
    <div class="user-data__main">
      <strong>{{ user.name }}</strong>
      <span class="username">@{{ user.username }}</span>
    </div>

    <div class="user-data__details">
      <span><b>Email:</b> {{ user.email }}</span>
      <span><b>Phone:</b> {{ user.phone }}</span>
      <span><b>Website:</b> {{ user.website }}</span>
      <span
        ><b>Address:</b> {{ user.address.city }},
        {{ user.address.street }}</span
      >
      <span><b>Company:</b> {{ user.company.name }}</span>
    </div>
  </div>
</template>

<style scoped>
.user-data {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 12px 16px;
  background: #f5f5f5;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
}

.user-data__main {
  display: flex;
  gap: 10px;
}

.username {
  color: #777;
}

.user-data__details {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 8px;
  color: #555;
}

.user-data__details span {
  position: relative;
}

.user-data__details span:not(:last-child)::after {
  content: "|";
  margin-left: 8px;
  color: #ccc;
}
</style>
