import { useMemo } from "react";
import type { CompleteTodo, DeleteTodo, Todos } from "../types/todo.types";
import TodoItem from "./TodoItem";

export default function TodoList({
  todos,
  completeTodo,
  deleteTodo,
}: {
  todos: Todos;
  completeTodo: CompleteTodo;
  deleteTodo: DeleteTodo;
}) {
  // done 상태에 따라 Todo 배열 나눔
  const onTodos: Todos = useMemo(() => {
    return todos.filter((t) => t.completed === false);
  }, [todos]);
  const doneTodos: Todos = useMemo(() => {
    return todos.filter((t) => t.completed === true);
  }, [todos]);

  return (
    <div className='render-container'>
      {/* 완료되지 않은 투두 */}
      <div className='render-container__section'>
        <div className='render-container__title'>할 일</div>
        <div className='render-container__list'>
          {onTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              completeTodo={completeTodo}
              deleteTodo={deleteTodo}
            />
          ))}
        </div>
      </div>
      {/* 완료된 투두 */}
      <div className='render-container__section'>
        <div className='render-container__title'>완료</div>
        <div className='render-container__list'>
          {doneTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              completeTodo={completeTodo}
              deleteTodo={deleteTodo}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
