import React, { useState } from 'react';
import './style.css';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';

export interface Todo {
  id: string;
  text: string;
}

const makeId = () =>
  typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `${Date.now()}_${Math.random().toString(16).slice(2)}`;

function App() {
  // 제네릭으로 상태 타입 지정
  const [todos, setTodos] = useState<Todo[]>([]);
  const [done, setDone] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    const v = text.trim();
    if (!v) return;
    setTodos((prev) => [{ id: makeId(), text: v }, ...prev]);
  };

  // 업데이터 함수 안에서 다른 setState 호출 금지 (중복 방지)
  const completeTodo = (id: string) => {
    const target = todos.find((t) => t.id === id);
    if (!target) return;
    setTodos((prev) => prev.filter((t) => t.id !== id));
    setDone((prev) => [target, ...prev]);
  };

  const deleteDone = (id: string) => {
    setDone((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">To-Do List</h1>

      <TodoInput onAdd={addTodo} />

      <div className="render-container">
        <TodoList
          title="할 일"
          items={todos}
          type="todo"
          onComplete={completeTodo}
        />
        <TodoList
          title="완료"
          items={done}
          type="done"
          onDelete={deleteDone}
        />
      </div>
    </div>
  );
}

export default App;
