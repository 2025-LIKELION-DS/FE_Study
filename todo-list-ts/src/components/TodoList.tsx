import React from "react";
import TodoItem from "./TodoItem";
import { Todo } from "../api/todos";

interface TodoListProps {
  title: string;
  items: Todo[];
  onComplete?: (id: number, completed: boolean) => void;
  onDelete?: (id: number) => void;
  isCompleted: boolean;
}

export default function TodoList({
  title,
  items,
  onComplete,
  onDelete,
  isCompleted,
}: TodoListProps) {
  return (
    <div className="render-container__section">
      <h2 className="render-container__title">{title}</h2>
      <ul className="render-container__list">
        {items.map((item) => (
          <TodoItem
            key={item.id}
            todo={item}
            isCompleted={isCompleted}
            onComplete={onComplete}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
}
