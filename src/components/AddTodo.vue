<script setup lang="ts">
import { ref, computed } from "vue";
import type { Todo } from "@/types";
import { createTodo } from "@/api";

const props = defineProps<{
  availableUserIds: number[];
}>();

const emit = defineEmits<{
  (e: "add", todo: Todo): void;
}>();

const newTitle = ref("");
const newUserId = ref<number | null>(null);
const isAddingTodo = ref(false);

const isUserIdValid = computed(() => {
  return (
    newUserId.value !== null && props.availableUserIds.includes(newUserId.value)
  );
});
const showUserIdError = computed(() => {
  return newUserId.value !== null && !isUserIdValid.value;
});

const isAddDisabled = computed(() => {
  return !newTitle.value.trim() || !isUserIdValid.value;
});

async function addTodo() {
  if (isAddDisabled.value) return;
  isAddingTodo.value = true;
  try {
    const todo = await createTodo({
      title: newTitle.value,
      userId: newUserId.value!,
      completed: false,
    });
    emit("add", todo);
    newTitle.value = "";
    newUserId.value = null;
  } catch {
    alert("Failed to add todo. Please try again.");
  } finally {
    isAddingTodo.value = false;
  }
}

function validateUserId(event: Event) {
  const input = event.target as HTMLInputElement;
  let value = input.value.replace(/[^0-9]/gi, "");
  input.value = value;
  newUserId.value = value ? Number(value) : null;
}
</script>

<template>
  <div class="create-todo">
    <div>
      <input
        :value="newUserId"
        type="text"
        inputmode="numeric"
        placeholder="User ID"
        @input="validateUserId"
      />
      <p v-show="showUserIdError" class="error-message">Invalid User ID</p>
    </div>

    <input
      v-model="newTitle"
      type="text"
      placeholder="Todo title"
      @keyup.enter="addTodo"
    />

    <button :disabled="isAddDisabled" @click="addTodo">Add</button>
  </div>
</template>

<style scoped>
.create-todo {
  display: flex;
  align-items: flex-start;
  justify-content: end;
  flex-wrap: wrap;
  gap: 10px;
}

.create-todo > div,
.create-todo input,
.create-todo button {
  width: 100%;
}

@media (min-width: 560px) {
  .create-todo > div,
  .create-todo input,
  .create-todo button {
    width: auto;
  }
}

.create-todo input {
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.create-todo button {
  padding: 8px 14px;
  border: none;
  background: #3b82f6;
  color: white;
  border-radius: 6px;
  cursor: pointer;
}

.create-todo button:hover {
  background: #2563eb;
}

.create-todo button:disabled {
  background: #a5b4fc;
  cursor: not-allowed;
}
</style>
