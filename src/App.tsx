import { useCallback } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import "./styles/style.css";
import type { Todo, Todos } from "./types/todo.types";
import { qc } from "./main";

// GET /todos
async function fetchTodos() {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/");
  if (!res.ok) throw new Error("할 일을 불러오지 못했습니다.");
  const data: Todos = await res.json();
  return data.slice(0, 10);
}

// POST /todos
async function addTodoFn(todo: string): Promise<Todo> {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/", {
    method: "POST",
    body: JSON.stringify({
      userId: 0,
      id: Date.now(),
      title: todo,
      completed: false,
    }),
    headers: {
      "Content-type": "application/json",
    },
  });
  if (!res.ok) throw new Error("할 일을 추가하지 못했습니다.");
  return res.json();
}

// PATCH /todos/:id
async function completeTodoFn(id: number): Promise<Todo> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      completed: true,
    }),
    headers: {
      "Content-type": "application/json",
    },
  });
  if (!res.ok) throw new Error("할 일을 완료하지 못했습니다.");
  return res.json();
}

// DELETE /todos/:id
async function deleteTodoFn(id: number): Promise<void> {
  const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("할 일을 삭제하지 못했습니다.");
}

function App() {
  // todo 목록 불러오기
  const { data: todos } = useQuery<Todos>({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  // useMutation 함수들
  const addTodoMutation = useMutation({
    mutationFn: addTodoFn,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const completeTodoMutation = useMutation({
    mutationFn: completeTodoFn,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodoFn,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const addTodo = useCallback(
    (todo: string) => {
      const t = todo.trim();
      if (!t) return;
      addTodoMutation.mutate(t);
    },
    [addTodoMutation]
  );

  const completeTodo = useCallback(
    (id: number) => {
      completeTodoMutation.mutate(id);
    },
    [completeTodoMutation]
  );

  const deleteTodo = useCallback(
    (id: number) => {
      deleteTodoMutation.mutate(id);
    },
    [deleteTodoMutation]
  );

  return (
    <>
      <div className='todo-container'>
        <div className='todo-container__header'>🦁 LIKELION TO-DO</div>
        <TodoInput addTodo={addTodo} />
        <TodoList
          todos={todos || []}
          completeTodo={completeTodo}
          deleteTodo={deleteTodo}
        />
      </div>
    </>
  );
}

export default App;
