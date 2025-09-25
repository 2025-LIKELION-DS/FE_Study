import { TodoApi } from "./types";

const BASE = "https://jsonplaceholder.typicode.com";

export async function fetchTodos(): Promise<TodoApi[]> {
  const res = await fetch(`${BASE}/todos?_limit=20`);
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
}

export async function createTodo(title: string): Promise<TodoApi> {
  const res = await fetch(`${BASE}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: 1, title, completed: false }),
  });
  if (!res.ok) throw new Error("Failed to create todo");
  return res.json();
}

export async function deleteTodo(id: number): Promise<{ success: boolean }> {
  const res = await fetch(`${BASE}/todos/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete todo");
  return { success: true };
}

export async function patchTodoComplete(id: number, completed: boolean): Promise<TodoApi> {
  const res = await fetch(`${BASE}/todos/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }),
  });
  if (!res.ok) throw new Error("Failed to patch todo");
  return res.json();
}
