import React from 'react';
import { type Todo, useDeleteTodo, useToggleTodo } from "../api/todos";
import './style.css';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const deleteMutation = useDeleteTodo();
  const toggleMutation = useToggleTodo();

  const complete = () => {
    toggleMutation.mutate(todo);
  };

  const deleteTodo = () => {
    deleteMutation.mutate(todo.id);
  };

  return (
    <div className="render-container__item">
      <span
        className={`render-container__item-text ${todo.completed ? "completed" : ""}`}
        onClick={complete}
      >
        {todo.title}
      </span>
      <button
  className={`render-container__item-button ${todo.completed ? "deleteTodo" : "complete"}`}
  onClick={todo.completed ? deleteTodo : complete}
>
  {todo.completed ? "삭제" : "완료"}
</button>
    </div>
  );
};

export default TodoItem;
