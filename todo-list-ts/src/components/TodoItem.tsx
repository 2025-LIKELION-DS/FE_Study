import React from "react";

interface TodoItemProps {
  text: string;
  index: number;
  isCompleted: boolean;
  onComplete?: (index: number) => void;
  onDelete?: (index: number) => void;
}

export default function TodoItem({
  text,
  index,
  isCompleted,
  onComplete,
  onDelete,
}: TodoItemProps) {
  return (
    <li className="render-container__item">
      <span className="render-container__item-text">{text}</span>
      {!isCompleted && onComplete && (
        <button
          className="render-container__item-button complete"
          onClick={() => onComplete(index)}
        >
          완료
        </button>
      )}
      {isCompleted && onDelete && (
        <button
          className="render-container__item-button delete"
          onClick={() => onDelete(index)}
        >
          삭제
        </button>
      )}
    </li>
  );
}
