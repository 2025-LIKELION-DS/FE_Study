import React, { useState, memo } from 'react'

type TodoInputProps={
    onAdd: (text:string) => void;
};

function TodoInput({onAdd}:TodoInputProps) {

    const [value, setValue] = useState<string>('');
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const text = value.trim();
        if (!text) return;
        onAdd(text);
        setValue('');
    }

    return (
        <form className="todo-container__form" onSubmit={handleSubmit}>
            <input className='todo-container__input' 
                value={value}
                placeholder='할 일을 입력해보세요!'
                onChange={(event) => {
                setValue(event.target.value);
                }}/>
            <button className='todo-container__button' type="submit">추가</button>
        </form>
    )
}

export default memo(TodoInput)