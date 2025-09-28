import React from "react";
import { useState } from "react";

interface Todo_text{
    onAdd: (text: string)=> void;
}
function TodoInput({ onAdd }: Todo_text ) {
    const [ input, setInput ] = useState("");

    const Submit = (e: React.FormEvent ) => {
        e.preventDefault();
        onAdd(input);
        setInput("");
    }
    return (
    <>
        <form className="todo-container__form" onSubmit={Submit}>
            <input type="text" placeholder="할 일을 입력해보세요!" className="todo-container__input" value={input} onChange={(e) => setInput(e.target.value)}></input>
            <button className="todo-container__button" type="submit"> 추가</button>
        </form>
    </>
)
}

export default TodoInput
