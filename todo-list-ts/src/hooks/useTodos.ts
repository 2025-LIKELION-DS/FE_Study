import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTodo, deleteTodo, fetchTodos, patchTodoComplete } from "../api";
import { Todo, toUITodo } from "../types";

const QK = {
  todos: ["todos"] as const,
};

export function useTodos() {
  const qc = useQueryClient();

  // 목록 조회
  const { data, isLoading, isError, error } = useQuery({
    queryKey: QK.todos,
    queryFn: fetchTodos,
    select: (list) => list.map(toUITodo),
  });

  const todos = data ?? [];

  // 추가
  const addMutation = useMutation({
    mutationFn: (text: string) => createTodo(text),
    onSuccess: () => qc.invalidateQueries({ queryKey: QK.todos }),
  });

  // 삭제
  const delMutation = useMutation({
    mutationFn: (id: number) => deleteTodo(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: QK.todos }),
  });

  // 완료(완료로 고정)
  const completeMutation = useMutation({
    mutationFn: (vars: { id: number; completed: boolean }) =>
      patchTodoComplete(vars.id, vars.completed),
    onSuccess: () => qc.invalidateQueries({ queryKey: QK.todos }),
  });

  return {
    todos,
    isLoading,
    isError,
    error: (error as Error) ?? null,
    addTodo: (text: string) => addMutation.mutate(text),
    deleteTodo: (id: number) => delMutation.mutate(id),
    completeTodo: (id: number) => completeMutation.mutate({ id, completed: true }),
  };
}
