import React from "react";
import TodoInput from "./component/TodoInput";
import TodoList from "./component/TodoList";
import "./style.css";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { fetchTodos, createTodo, deleteTodo, patchTodoComplete } from "./api";
import { toUITodo } from "./types";

const queryClient = new QueryClient();

const Page: React.FC = () => {
  const qc = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    select: (list) => list.map(toUITodo),
  });

  const addMutation = useMutation({
    mutationFn: (text: string) => createTodo(text),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["todos"] }),
  });

  const delMutation = useMutation({
    mutationFn: (id: number) => deleteTodo(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["todos"] }),
  });

  const completeMutation = useMutation({
    mutationFn: (id: number) => patchTodoComplete(id, true),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["todos"] }),
  });

  if (isLoading) return <div className="todo-container">로딩 중...</div>;
  if (isError) return <div className="todo-container">에러: {(error as Error)?.message}</div>;

  const todos = data ?? [];
  const activeTodos = todos.filter((t) => !t.isCompleted);
  const completedTodos = todos.filter((t) => t.isCompleted);

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">🦁 LIKELION TO-DO</h1>

      <TodoInput onAdd={(text) => addMutation.mutate(text)} />

      <div className="render-container">
        <TodoList
          title="해야 할 일"
          todos={activeTodos}
          onComplete={(id) => completeMutation.mutate(id)}
          onDelete={(id) => delMutation.mutate(id)}
        />
        <TodoList
          title="완료한 일"
          todos={completedTodos}
          onDelete={(id) => delMutation.mutate(id)}
        />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Page />
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
};

export default App;
