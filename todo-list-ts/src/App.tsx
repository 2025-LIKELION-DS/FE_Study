import { useState } from "react";
import "./style.css";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

export type Todo = {
  id: string;
  text: string;
  done: boolean;
};

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setTodos((prev) => [
      { id: crypto.randomUUID(), text: t, done: false },
      ...prev,
    ]);
  };

  const markDone = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: true } : t))
    );
  };

  const removeTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const doing = todos.filter((t) => !t.done);
  const done = todos.filter((t) => t.done);

  return (
    <div className="todo-container">
      <div className="todo-container__header">🦁 LIKELION TO-DO</div>

      <TodoInput onAdd={addTodo} />

      <div className="render-container">
        <section className="render-container__section">
          <div className="render-container__title">할 일</div>
          <TodoList mode="doing" items={doing} onDone={markDone} />
        </section>

        <section className="render-container__section">
          <div className="render-container__title">완료</div>
          <TodoList mode="done" items={done} onDelete={removeTodo} />
        </section>
      </div>
    </div>
  );
}
