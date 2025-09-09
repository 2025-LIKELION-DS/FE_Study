import React from "react";

interface TodoItemProps {
    id: number;
    text: string;
    completed: boolean;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

const TodoItem = ({ id, text, completed, onToggle, onDelete }: TodoItemProps) => {
    return (
        <li className="render-container__item">
            <span className="render-container__item-text">{text}</span>
            {!completed ? (
                <button
                    className="render-container__item-button complete"
                    onClick={() => onToggle(id)}
                >
                    완료
                </button>
            ) : (
                <button
                    className="render-container__item-button delete"
                    onClick={() => onDelete(id)}
                >
                    삭제
                </button>
            )}
        </li>
    );
};

export default TodoItem;
