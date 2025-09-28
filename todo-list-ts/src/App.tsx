// src/App.tsx
import "./style.css";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

export default function App() {
  return (
    <div className="todo-container">
      <div className="todo-container__header">🦁 LIKELION TO-DO</div>

      <TodoInput />

      <div className="render-container">
        <section className="render-container__section">
          <div className="render-container__title">할 일</div>
          <TodoList mode="doing" />
        </section>

        <section className="render-container__section">
          <div className="render-container__title">완료</div>
          <TodoList mode="done" />
        </section>
      </div>
    </div>
  );
}
