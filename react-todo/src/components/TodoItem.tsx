import React from 'react';
import type { Todo } from '../App';

export interface TodoItemProps {
    todo: Todo;
    type: 'todo' | 'done';
    onComplete?: (id: string) => void;
    onDelete?: (id: string) => void;
}

function TodoItem({ todo, type, onComplete, onDelete }: TodoItemProps) {
    return (
        <li className="render-container__item">
            <span className="render-container__item-text">{todo.text}</span>

            {type === 'todo' ? (
                <button
                    type="button" // 폼 submit 방지
                    className="render-container__item-button complete"
                    onClick={() => onComplete?.(todo.id)}
                >
                    완료
                </button>
            ) : (
                <button
                    type="button" // 폼 submit 방지
                    className="render-container__item-button delete"
                    onClick={() => onDelete?.(todo.id)}
                >
                    삭제
                </button>
            )}
        </li>
    );
}

export default TodoItem;
