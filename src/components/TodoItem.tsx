// src/components/TodoItem.tsx
import React from 'react';
import type { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <li className="render-container__item">
      <span className="render-container__item-text">{todo.text}</span>
      <div>
        {todo.isDone ? (
          <button
            onClick={() => onDelete(todo.id)}
            className="render-container__item-button delete"
          >
            삭제
          </button>
        ) : (
          <button
            onClick={() => onToggle(todo.id)}
            className="render-container__item-button complete"
          >
            완료
          </button>
        )}
      </div>
    </li>
  );
};

export default TodoItem;