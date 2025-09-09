// src/App.tsx
import React, { useState } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import type { Todo } from './types';
import './style.css'; // 새로 만든 css 파일을 import

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text: text,
      isDone: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const workingTodos = todos.filter((todo) => !todo.isDone);
  const doneTodos = todos.filter((todo) => todo.isDone);

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">🦁 LIKELION To-Do</h1>
      <TodoInput onAdd={addTodo} />
      <div className="render-container">
        <TodoList
          title="해야 할 일 🔥"
          todos={workingTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
        <TodoList
          title="완료한 일 ✅"
          todos={doneTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />
      </div>
    </div>
  );
};

export default App;