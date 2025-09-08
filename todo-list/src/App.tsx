import React, { useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import "./style.css";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // Todo 추가
  const addTodo = (text: string) => {
    const newTodo: Todo = { id: Date.now(), text, completed: false };
    setTodos([...todos, newTodo]);
  };

  // 완료 상태 토글
  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Todo 삭제
  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="App">
      <div className="todo-container">
      
        <h1 className="todo-container__header">🦁 LIKELION TODO</h1>
        {/* Todo 입력 폼 */}
        <TodoInput onAdd={addTodo} />

        {/* 할 일 목록 */}
        <div className="render-container">
          <TodoList
            title="할 일"
            items={todos.filter((todo) => !todo.completed)}
            onToggle={toggleComplete}
            onDelete={deleteTodo}
          />
          <TodoList
            title="완료"
            items={todos.filter((todo) => todo.completed)}
            onToggle={toggleComplete}
            onDelete={deleteTodo}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
