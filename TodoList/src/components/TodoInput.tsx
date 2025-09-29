import React, { useState } from "react";
import { useAddTodo } from "../api/todos";
import './style.css';

export default function TodoInput() {
  const [text, setText] = useState("");

  const addTodoMutation = useAddTodo();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedText = text.trim();
    if (!trimmedText) return;

    addTodoMutation.mutate(trimmedText);

    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="todo-container__form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="할 일을 입력하세요"
        className="todo-container__input"
      />
      <button type="submit" className="todo-container__button">
        추가
      </button>
    </form>
  );
}