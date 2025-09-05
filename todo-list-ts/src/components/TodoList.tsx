import React from "react";
import TodoItem from "./TodoItem";

interface TodoListProps {
  title: string;
  items: string[];
  onComplete?: (index: number) => void;
  onDelete?: (index: number) => void;
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
        {items.map((item, index) => (
          <TodoItem
            key={index}
            text={item}
            index={index}
            isCompleted={isCompleted}
            onComplete={onComplete}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
}
