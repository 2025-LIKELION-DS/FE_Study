import React, { useState } from "react";
import TodoInput from "./component/TodoInput";
import TodoList from "./component/TodoList";
import { Todo } from "./types";
import "./style.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient(); // QueryClient 생성
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
  <QueryClientProvider client={queryClient}>
      {/* 애플리케이션 컴포넌트 페이지 컴포넌트 등등 */}
      {/* {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />} */} {/* vite에서 사용 */}
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />} {/* CRA 환경에서 사용 */}
    
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
    </QueryClientProvider>
  );
};
export default App;
