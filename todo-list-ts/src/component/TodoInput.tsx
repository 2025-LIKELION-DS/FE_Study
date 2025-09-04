import React, { useState } from "react";

interface TodoInputProps {
  onAdd: (text: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ onAdd }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onAdd(input);
    setInput("");
  };

  return (
    <form className="todo-container__form" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-container__input"
        placeholder="할 일을 입력하세요..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button className="todo-container__button" type="submit">
        추가
      </button>
    </form>
  );
};

export default TodoInput;
