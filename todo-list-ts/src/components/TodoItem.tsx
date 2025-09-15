import React from "react";
import { Todo } from "../api/todos";

interface TodoItemProps {
  todo: Todo;
  isCompleted: boolean;
  onComplete?: (id: number, completed: boolean) => void;
  onDelete?: (id: number) => void;
}

export default function TodoItem({
  todo,
  isCompleted,
  onComplete,
  onDelete,
}: TodoItemProps) {
  return (
    <li className="render-container__item">
      <span className="render-container__item-text">{todo.title}</span>
      {!isCompleted && onComplete && (
        <button
          className="render-container__item-button complete"
          onClick={() => onComplete(todo.id, true)}
        >
          완료
        </button>
      )}
      {isCompleted && onDelete && (
        <button
          className="render-container__item-button delete"
          onClick={() => onDelete(todo.id)}
        >
          삭제
        </button>
      )}
    </li>
  );
}
