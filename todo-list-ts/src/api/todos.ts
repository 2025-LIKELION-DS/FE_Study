export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const BASE_URL = "https://jsonplaceholder.typicode.com/todos";

export async function fetchTodos(): Promise<Todo[]> {
  const res = await fetch(`${BASE_URL}?_limit=10`);
  if (!res.ok) throw new Error("Failed to fetch todos");
  return res.json();
}

export async function addTodo(title: string): Promise<Todo> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId: 1, title, completed: false }),
  });
  if (!res.ok) throw new Error("Failed to add todo");
  return res.json();
}

export async function deleteTodo(id: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete todo");
}

export async function toggleTodo(
  id: number,
  completed: boolean
): Promise<Todo> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }),
  });
  if (!res.ok) throw new Error("Failed to toggle todo");
  return res.json();
}
