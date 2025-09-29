import React, { useState } from 'react';

export interface TodoInputProps {
    onAdd: (text: string) => void;
}

function TodoInput({ onAdd }: TodoInputProps) {
    const [text, setText] = useState<string>('');

    const submit = () => {
        const v = text.trim();
        if (!v) return;
        onAdd(v);
        setText('');
    };

    return (
        <form
            className="todo-container__form"
            onSubmit={(e) => {
                e.preventDefault(); // Enter로 제출
                submit();
            }}
        >
            <input
                className="todo-container__input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="할 일을 입력하세요"
                aria-label="할 일 입력"
            />
            <button className="todo-container__button" type="submit">
                추가
            </button>
        </form>
    );
}

export default TodoInput;
