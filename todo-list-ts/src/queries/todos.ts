import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/client";
import type { Todo } from "../types/todo";

export const todoKeys = {
  all: ["todos"] as const,
  detail: (id: number) => [...todoKeys.all, id] as const,
};

async function fetchTodos(): Promise<Todo[]> {
  const { data } = await api.get("/todos", { params: { _limit: 10 } });
  return data;
}

export function useTodos() {
  return useQuery({ queryKey: todoKeys.all, queryFn: fetchTodos });
}

type AddTodoInput = { title: string };
async function addTodo(input: AddTodoInput): Promise<Todo> {
  const { data } = await api.post("/todos", {
    title: input.title,
    completed: false,
    userId: 1,
  });
  return data;
}

export function useAddTodo() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: addTodo,
    onSuccess: () => qc.invalidateQueries({ queryKey: todoKeys.all }),
  });
}

async function deleteTodo(id: number) {
  await api.delete(`/todos/${id}`);
  return id;
}
export function useDeleteTodo() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => qc.invalidateQueries({ queryKey: todoKeys.all }),
  });
}

async function toggleTodo({
  id,
  completed,
}: {
  id: number;
  completed: boolean;
}): Promise<Todo> {
  const { data } = await api.patch(`/todos/${id}`, { completed });
  return data;
}
export function useToggleTodo() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: toggleTodo,
    onSuccess: () => qc.invalidateQueries({ queryKey: todoKeys.all }),
  });
}
