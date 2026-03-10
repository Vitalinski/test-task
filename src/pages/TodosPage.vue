<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import type { Todo, User, TodoFilters } from "@/types";
import UserData from "@/components/UserData.vue";
import TodosList from "@/components/TodosList.vue";
import AddTodo from "@/components/AddTodo.vue";
import TodosFilters from "@/components/TodosFilters.vue";
import { fetchTodos } from "@/api";

const user = ref<User | null>(
  JSON.parse(localStorage.getItem("user") || "null"),
);
const todos = ref<Todo[]>([]);
const isLoading = ref(false);
const favoriteIds = ref<number[]>(
  JSON.parse(localStorage.getItem("favoriteTodos") || "[]"),
);
const filters = ref<TodoFilters>({
  status: "all",
  userId: "all",
  search: "",
});

const availableUserIds = computed(() => {
  const ids = new Set<number>();

  todos.value.forEach((todo) => {
    ids.add(todo.userId);
  });

  return Array.from(ids).sort((a, b) => a - b);
});

const filteredTodos = computed(() => {
  const query = filters.value.search.trim().toLowerCase();
  return todos.value.filter((todo) => {
    if (filters.value.status === "completed" && !todo.completed) return false;

    if (filters.value.status === "uncompleted" && todo.completed) return false;

    if (
      filters.value.status === "favorites" &&
      !favoriteIds.value.includes(todo.id)
    )
      return false;

    if (filters.value.userId !== "all" && todo.userId !== filters.value.userId)
      return false;

    if (query && !todo.title.toLowerCase().includes(query)) return false;

    return true;
  });
});

function toggleFavorite(id: number) {
  if (favoriteIds.value.includes(id)) {
    favoriteIds.value = favoriteIds.value.filter((f) => f !== id);
  } else {
    favoriteIds.value.push(id);
  }

  localStorage.setItem("favoriteTodos", JSON.stringify(favoriteIds.value));
}

async function loadTodos() {
  isLoading.value = true;
  try {
    todos.value = await fetchTodos();
  } catch (err) {
    console.error("Error loading todos:", err);
  } finally {
    isLoading.value = false;
  }
}

function handleAddTodo(todo: Todo) {
  todos.value.push(todo);
}

onMounted(loadTodos);
</script>

<template>
  <UserData v-if="user" :user="user" />

  <div class="todos-page">
    <h1>Todo List</h1>

    <AddTodo @add="handleAddTodo" :available-user-ids="availableUserIds" />

    <TodosFilters v-model="filters" :available-user-ids="availableUserIds" />

    <TodosList
      v-if="!isLoading"
      :todos="filteredTodos"
      :favorite-ids="favoriteIds"
      @toggle-favorite="toggleFavorite"
    />
    <p v-else class="loading">Loading todos...</p>
  </div>
</template>

<style scoped>
.todos-page {
  max-width: 900px;
  margin: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.loading {
  text-align: center;
  color: #555;
}
</style>
