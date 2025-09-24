import { useQuery } from "@tanstack/react-query";
import { api } from "./api/client";
import TodoList from "./components/TodoList";
import TodoInput from "./components/TodoInput";
import type { Todo } from "./types/todo";

const fetchTodos = async (): Promise<Todo[]> => {
  const { data } = await api.get("/todos");
  return data.slice(0, 10); 
};

export default function App() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>에러 발생!</p>;

  const todos = data ?? [];
  const pending = todos.filter((t) => !t.completed);
  const done = todos.filter((t) => t.completed);

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">🦁 LIKELION TODO</h1>
      <TodoInput />
      <div className="render-container">
        <TodoList title="할 일" items={pending} />
        <TodoList title="완료" items={done} />
      </div>
    </div>
  );
}
