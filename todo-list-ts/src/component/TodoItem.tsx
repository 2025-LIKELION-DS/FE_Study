import React from "react";
import { Todo } from "../types";

interface TodoItemProps {
  todo: Todo;
  onComplete?: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onComplete, onDelete }) => {
  return (
    <li className={`render-container__item ${todo.isCompleted ? 'completed' : ''}`}>
      <span className="render-container__item-text">{todo.text}</span>
      
      {!todo.isCompleted && onComplete && (
        <button
          className="render-container__item-button complete"
          onClick={() => onComplete(todo.id)}
        >
          완료
        </button>
      )}

      {todo.isCompleted && (
          
          <button
            className="render-container__item-button delete"
            onClick={() => onDelete(todo.id)}
          >
            삭제
          </button>
      )}
    </li>
  );
};

export default TodoItem;