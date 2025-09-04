import React, { useState } from "react";
import TodoInput from "./component/TodoInput";
import TodoList from "./component/TodoList";
import { Todo } from "./types";
import "./style.css";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      isCompleted: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const completeTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: true } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const activeTodos = todos.filter((todo) => !todo.isCompleted);
  const completedTodos = todos.filter((todo) => todo.isCompleted);

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">😻 To-Do List 📒</h1>
      <TodoInput onAdd={addTodo} />

      <div className="render-container">
        <TodoList
          title="해야 할 일"
          todos={activeTodos}
          onComplete={completeTodo}
          onDelete={deleteTodo}
        />
        <TodoList
          title="완료한 일"
          todos={completedTodos}
          onDelete={deleteTodo}
        />
      </div>
    </div>
  );
};

export default App;
