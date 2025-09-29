import React from "react";
import "./style.css";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { fetchTodos, addTodo, deleteTodo, toggleTodo, Todo } from "./api/todos";

const queryClient = new QueryClient();

function TodoApp() {
  const queryClient = useQueryClient();

  const {
    data: todos = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const addMutation = useMutation({
    mutationFn: (title: string) => addTodo(title),
    onMutate: async (title) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const prevTodos = queryClient.getQueryData<Todo[]>(["todos"]);
      const tempTodo: Todo = {
        userId: 1,
        id: Date.now(),
        title,
        completed: false,
      };
      queryClient.setQueryData<Todo[]>(["todos"], (old) =>
        old ? [tempTodo, ...old] : [tempTodo]
      );
      return { prevTodos };
    },
    onError: (_err, _vars, context) => {
      if (context?.prevTodos) {
        queryClient.setQueryData(["todos"], context.prevTodos);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteTodo(id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const prevTodos = queryClient.getQueryData<Todo[]>(["todos"]);
      queryClient.setQueryData<Todo[]>(["todos"], (old) =>
        old ? old.filter((t) => t.id !== id) : []
      );
      return { prevTodos };
    },
    onError: (_err, _vars, context) => {
      if (context?.prevTodos) {
        queryClient.setQueryData(["todos"], context.prevTodos);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const toggleMutation = useMutation({
    mutationFn: ({ id, completed }: { id: number; completed: boolean }) =>
      toggleTodo(id, completed),
    onMutate: async ({ id, completed }) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });
      const prevTodos = queryClient.getQueryData<Todo[]>(["todos"]);
      queryClient.setQueryData<Todo[]>(["todos"], (old) =>
        old ? old.map((t) => (t.id === id ? { ...t, completed } : t)) : []
      );
      return { prevTodos };
    },
    onError: (_err, _vars, context) => {
      if (context?.prevTodos) {
        queryClient.setQueryData(["todos"], context.prevTodos);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleAdd = (text: string) => addMutation.mutate(text);
  const handleDelete = (id: number) => deleteMutation.mutate(id);
  const handleComplete = (id: number, completed: boolean) =>
    toggleMutation.mutate({ id, completed });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>에러 발생!</p>;

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">🦁To-Do List</h1>
      <TodoInput onAdd={handleAdd} />
      <div className="render-container">
        <TodoList
          title="할 일"
          items={todos.filter((t) => !t.completed)}
          onComplete={handleComplete}
          isCompleted={false}
        />
        <TodoList
          title="완료"
          items={todos.filter((t) => t.completed)}
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
