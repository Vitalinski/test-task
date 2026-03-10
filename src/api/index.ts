import type { Todo, User } from "@/types";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export async function fetchUsers(): Promise<User[]> {
  try {
    const res = await fetch(`${BASE_URL}/users`);

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    return await res.json();
  } catch (err) {
    console.error("Failed to fetch users:", err);
    throw err;
  }
}

export async function fetchTodos(): Promise<Todo[]> {
  try {
    const res = await fetch(`${BASE_URL}/todos`);

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    return await res.json();
  } catch (err) {
    console.error("Failed to fetch todos:", err);
    throw err;
  }
}

export async function createTodo(todo: {
  title: string;
  userId: number;
  completed?: boolean;
}): Promise<Todo> {
  try {
    const res = await fetch(`${BASE_URL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(todo),
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    return await res.json();
  } catch (err) {
    console.error("Failed to create todo:", err);
    throw err;
  }
}
