import React, { useState, memo } from 'react'

type TodoInputProps={
    onAdd: (title:string) => void;
    isAdding?: boolean;
};

function TodoInput({onAdd, isAdding}:TodoInputProps) {

    const [value, setValue] = useState<string>('');
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const title = value.trim();
        if (!title || isAdding) return; 
        onAdd(title);
        setValue('');
    }

    return (
        <form className="todo-container__form" onSubmit={handleSubmit}>
            <input className='todo-container__input' 
                value={value}
                placeholder='할 일을 입력해보세요!'
                onChange={(event) => {
                setValue(event.target.value);
                }}
                disabled={isAdding} 
                />
            <button className='todo-container__button' type="submit" disabled={isAdding || !value.trim()}>{isAdding ? '추가 중...' : '추가'}</button>
        </form>
    )
}

export default memo(TodoInput)