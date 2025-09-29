// src/components/TodoInput.tsx
import React, { useState } from 'react';

interface TodoInputProps {
  onAdd: (text: string) => void;
}

const TodoInput: React.FC<TodoInputProps> = ({ onAdd }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddClick = () => {
    if (inputValue.trim() === '') return;
    onAdd(inputValue);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddClick();
    }
  };

  return (
    <div className="todo-container__form">
      <input
        type="text"
        className="todo-container__input"
        placeholder="할 일을 입력해 보세요!"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <button className="todo-container__button" onClick={handleAddClick}>
        추가
      </button>
    </div>
  );
};

export default TodoInput;