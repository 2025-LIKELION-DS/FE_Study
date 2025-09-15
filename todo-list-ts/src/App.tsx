import React, { useEffect, useState } from "react";
import "./style.css";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { fetchTodos, addTodo, deleteTodo, toggleTodo, Todo } from "./api/todos";

const queryClient = new QueryClient();

function TodoApp() {
  const {
    data: todos = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const [localTodos, setLocalTodos] = useState<Todo[]>([]);

  useEffect(() => {
    if (localTodos.length === 0) {
      setLocalTodos(todos);
    }
    // 무한루프를 방지하기 위해 아래 코드를 찾아 삽입했습니다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todos]);


  const addMutation = useMutation({
    mutationFn: (title: string) => addTodo(title),
    onSuccess: (newTodo) => {
      const tempTodo = { ...newTodo, id: Date.now() };
      setLocalTodos((prev) => [tempTodo, ...prev]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteTodo(id),
    onSuccess: (_, id) =>
      setLocalTodos((prev) => prev.filter((t) => t.id !== id)),
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, completed }: { id: number; completed: boolean }) =>
      toggleTodo(id, completed),
    onSuccess: (updatedTodo) =>
      setLocalTodos((prev) =>
        prev.map((t) => (t.id === updatedTodo.id ? updatedTodo : t))
      ),
  });

  const handleAdd = (text: string) => addMutation.mutate(text);
  const handleDelete = (id: number) => deleteMutation.mutate(id);
  const handleComplete = (id: number, completed: boolean) => {
    setLocalTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed } : t))
    );
    toggleMutation.mutate({ id, completed });
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>에러 발생!</p>;

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">🦁To-Do List</h1>
      <TodoInput onAdd={handleAdd} />
      <div className="render-container">
        <TodoList
          title="할 일"
          items={localTodos.filter((t) => !t.completed)}
          onComplete={handleComplete}
          isCompleted={false}
        />
        <TodoList
          title="완료"
          items={localTodos.filter((t) => t.completed)}
          onDelete={handleDelete}
          isCompleted={true}
        />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoApp />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
