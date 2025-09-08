import { useCallback, useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import "./styles/style.css";
import type { Todo } from "./types/todo.types";

function App() {
  // 전역에서 모든 todo 관련 함수를 만들고 prop으로 각 컴포넌트에 뿌리기

  // TS는 useState 빈 배열이면 never로 추론 -> 제네릭 필요
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = useCallback((todo: string) => {
    const t = todo.trim();
    if (!t) return;
    setTodos((prev) => [{ id: Date.now(), todo: t, done: false }, ...prev]);
  }, []);

  const completeTodo = useCallback((id: number) => {
    setTodos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, done: true } : p))
    );
  }, []);

  const deleteTodo = useCallback((id: number) => {
    setTodos((prev) => prev.filter((p) => p.id !== id));
  }, []);

  return (
    <>
      <div className='todo-container'>
        <div className='todo-container__header'>🦁 LIKELION TO-DO</div>
        <TodoInput addTodo={addTodo} />
        <TodoList
          todos={todos}
          completeTodo={completeTodo}
          deleteTodo={deleteTodo}
        />
      </div>
    </>
  );
}

export default App;
