<script setup lang="ts">
import type { TodoFilters } from "@/types";

const filters = defineModel<TodoFilters>({ required: true });

const props = defineProps<{
  availableUserIds: number[];
}>();
</script>

<template>
  <div class="filters">
    <select v-model="filters.status">
      <option value="all">All</option>
      <option value="completed">Completed</option>
      <option value="uncompleted">Uncompleted</option>
      <option value="favorites">Favorites</option>
    </select>

    <select v-model="filters.userId">
      <option value="all">All Users</option>

      <option v-for="id in availableUserIds" :key="id" :value="id">
        User {{ id }}
      </option>
    </select>

    <input
      v-model="filters.search"
      type="text"
      placeholder="Search by title..."
    />
  </div>
</template>

<style scoped>
.filters {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.filters input {
  grid-column: span 2;
}

@media (min-width: 560px) {
  .filters {
    grid-template-columns: repeat(3, 1fr);
  }
  .filters input {
    grid-column: span 1;
  }
}

.filters select,
.filters input {
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
}
</style>
