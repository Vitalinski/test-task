<script setup lang="ts">
import { ref, computed } from "vue";
import type { Todo } from "@/types";

const props = defineProps<{
  todos: Todo[];
  favoriteIds: number[];
}>();

const emit = defineEmits<{
  (e: "toggle-favorite", id: number): void;
}>();

const itemHeight = 40;
const visibleCount = 12;

const scrollTop = ref(0);

const startIndex = computed(() => {
  const index = Math.floor(scrollTop.value / itemHeight);
  const maxStart = Math.max(0, props.todos.length - visibleCount);
  return Math.min(index, maxStart);
});

const endIndex = computed(() =>
  Math.min(startIndex.value + visibleCount, props.todos.length),
);

const visibleTodos = computed(() =>
  props.todos.slice(startIndex.value, endIndex.value),
);

const topPadding = computed(() => startIndex.value * itemHeight);

const bottomPadding = computed(() =>
  Math.max(0, (props.todos.length - endIndex.value) * itemHeight),
);

function onScroll(e: Event) {
  const target = e.target as HTMLElement;
  scrollTop.value = target.scrollTop;
}

function toggleFavorite(id: number) {
  emit("toggle-favorite", id);
}

function isFavorite(id: number) {
  return props.favoriteIds.includes(id);
}
</script>

<template>
  <div class="table">
    <div class="table__header">
      <div>Title</div>
      <div class="centered">Status</div>
      <div class="centered">Favorite</div>
    </div>

    <div class="table__body" @scroll="onScroll" v-if="todos.length">
      <div :style="{ height: topPadding + 'px' }"></div>

      <div v-for="todo in visibleTodos" :key="todo.id" class="table__row">
        <div class="row__title">
          {{ todo.title }}
        </div>

        <div class="centered">
          <span v-if="todo.completed">✅</span>
          <span v-else>⬜</span>
        </div>

        <div class="centered">
          <span class="favorite" @click="toggleFavorite(todo.id)">
            {{ isFavorite(todo.id) ? "❤️" : "🤍" }}
          </span>
        </div>
      </div>

      <div :style="{ height: bottomPadding + 'px' }"></div>
    </div>
    <div v-else class="table__body centered table__body__empty">
      <p class="empty-title">No todos found.</p>
      <p class="empty-description">
        Try to change your filters or reload the page.
      </p>
    </div>
  </div>
</template>

<style scoped>
.table {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.table__header {
  display: grid;
  grid-template-columns: 1fr 120px 100px;
  background: #f5f5f5;
  padding: 10px 14px;
  font-weight: 600;
  border-bottom: 1px solid #ddd;
}

.table__body {
  height: 400px;
  overflow-y: auto;
}

.table__body__empty {
  flex-direction: column;
  gap: 6px;
  padding: 20px;
  color: #555;
}

.empty-title {
  font-size: 20px;
  font-weight: 600;
}

.empty-description {
  text-align: center;
}

.table__row {
  display: grid;
  grid-template-columns: 1fr 120px 100px;
  align-items: center;
  height: 40px;
  padding: 0 14px;
  border-bottom: 1px solid #eee;
}

.table__row:hover {
  background: #fafafa;
}

.centered {
  display: flex;
  align-items: center;
  justify-content: center;
}

.row__title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.favorite {
  cursor: pointer;
  font-size: 18px;
}
</style>
