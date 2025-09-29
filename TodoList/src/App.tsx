import { useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useTodos } from "./api/todos";
import './components/style.css';



const App = () => {
  const { data: todos, isLoading, isError } = useTodos();

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>할 일 목록을 불러오는 데 실패했습니다.</p>;


  return (
    <div className="todo-container">
      <h1 className="todo-container__header">🦁LIKELION TO-DO</h1>

      <TodoInput />

      <div className="render-container">
        <div className="render-container__section">
          <div className="render-container__title">할 일</div>
          <TodoList todos={todos?.filter((t) => !t.completed) ?? []} />
        </div>

      
        <div className="render-container__section">
          <div className="render-container__title">완료</div>
          <TodoList todos={todos?.filter((t) => t.completed) ?? []} />
        </div>
      </div>
    </div>
  );
};

export default App;