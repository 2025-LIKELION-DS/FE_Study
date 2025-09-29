import React, { useState } from "react";
import "../style.css";

interface TodoInputProps {
    onAdd: (text: string) => void;
}

const TodoInput = ({ onAdd }: TodoInputProps) => {
    const [input, setInput] = useState("");

    const handleAdd = () => {
        if (input.trim() === "") return;
        onAdd(input);
        setInput("");
    };

    return (
        <div className="todo-container__form">
            <input
                className="todo-container__input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="할 일을 입력해보세요!"
                onKeyDown={(e) => e.key === "Enter" && handleAdd()}
            />
            <button className="todo-container__button" onClick={handleAdd}>
                추가
            </button>
        </div>
    );
};

export default TodoInput;
