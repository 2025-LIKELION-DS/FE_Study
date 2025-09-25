// import React from "react";
// import TodoInput from "./component/TodoInput";
// import TodoList from "./component/TodoList";
// import "./style.css";

// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import { useTodos } from "./hooks/useTodos";

// const queryClient = new QueryClient();

// const Page: React.FC = () => {
//   const { todos, isLoading, isError, error, addTodo, deleteTodo, completeTodo } = useTodos();

//   if (isLoading) return <div className="todo-container">로딩 중...</div>;
//   if (isError) return <div className="todo-container">에러: {error?.message}</div>;

//   const activeTodos = todos.filter((t) => !t.isCompleted);
//   const completedTodos = todos.filter((t) => t.isCompleted);

//   return (
//     <div className="todo-container">
//       <h1 className="todo-container__header">😻 To-Do List 📒</h1>

//       {/* 입력 → POST /todos */}
//       <TodoInput onAdd={addTodo} />

//       <div className="render-container">
//         {/* 완료/삭제 → PATCH/DELETE */}
//         <TodoList title="해야 할 일" todos={activeTodos} onComplete={completeTodo} onDelete={deleteTodo} />
//         <TodoList title="완료한 일" todos={completedTodos} onDelete={deleteTodo} />
//       </div>
//     </div>
//   );
// };

// const App: React.FC = () => {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <Page />
//       {/* Vite/CRA 공통: NODE_ENV로 Devtools 표시 */}
//       {process.env.NODE_ENV === "development" && <ReactQueryDevtools initialIsOpen={false} />}
//     </QueryClientProvider>
//   );
// };

// export default App;


// src/App.tsx
import React from "react";
import TodoInput from "./component/TodoInput";
import TodoList from "./component/TodoList";
import "./style.css";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// 아래 함수/타입은 앞서 만든 파일 기준 (api.ts / types.ts)
import { fetchTodos, createTodo, deleteTodo, patchTodoComplete } from "./api";
import { toUITodo } from "./types";

const queryClient = new QueryClient();

const Page: React.FC = () => {
  const qc = useQueryClient();

  // 목록 조회 (GET /todos)
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    select: (list) => list.map(toUITodo), // API → UI 타입 매핑
  });

  // 추가 (POST /todos)
  const addMutation = useMutation({
    mutationFn: (text: string) => createTodo(text),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["todos"] }),
  });

  // 삭제 (DELETE /todos/:id)
  const delMutation = useMutation({
    mutationFn: (id: number) => deleteTodo(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["todos"] }),
  });

  // 완료 (PATCH /todos/:id)
  const completeMutation = useMutation({
    mutationFn: (id: number) => patchTodoComplete(id, true),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["todos"] }),
  });

  if (isLoading) return <div className="todo-container">로딩 중...</div>;
  if (isError) return <div className="todo-container">에러: {(error as Error)?.message}</div>;

  const todos = data ?? [];
  const activeTodos = todos.filter((t) => !t.isCompleted); // 제한 없음
  const completedTodos = todos.filter((t) => t.isCompleted); // 제한 없음

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">🦁 LIKELION TO-DO</h1>

      {/* 입력 → POST */}
      <TodoInput onAdd={(text) => addMutation.mutate(text)} />

      <div className="render-container">
        {/* 완료/삭제 → PATCH/DELETE */}
        <TodoList
          title="해야 할 일"
          todos={activeTodos}
          onComplete={(id) => completeMutation.mutate(id)}
          onDelete={(id) => delMutation.mutate(id)}
        />
        <TodoList
          title="완료한 일"
          todos={completedTodos}
          onDelete={(id) => delMutation.mutate(id)}
        />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Page />
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
};

export default App;
