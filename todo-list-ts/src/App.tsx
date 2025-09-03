import React, { useState } from "react";
import "./style.css";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

export default function App() {
  const [todos, setTodos] = useState<string[]>([]);
  const [completed, setCompleted] = useState<string[]>([]);

  const addTodo = (text: string) => setTodos([...todos, text]);

  const completeTodo = (index: number) => {
    const todo = todos[index];
    setTodos(todos.filter((_, i) => i !== index));
    setCompleted([...completed, todo]);
  };

  const deleteTodo = (index: number) => {
    setCompleted(completed.filter((_, i) => i !== index));
  };

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">🦁To-Do List</h1>
      <TodoInput onAdd={addTodo} />
      <div className="render-container">
        <TodoList
          title="할 일"
          items={todos}
          onComplete={completeTodo}
          isCompleted={false}
        />
        <TodoList
          title="완료"
          items={completed}
          onDelete={deleteTodo}
          isCompleted={true}
        />
      </div>
    </div>
  );
}
