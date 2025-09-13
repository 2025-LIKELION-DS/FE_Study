import React, { useState } from 'react';
import '../components/style.css'; 

interface TODO {
    id: number;
    text: string;
    completed: boolean;
}

interface props{
    TODOs: TODO[];
    setTODOs: React.Dispatch<React.SetStateAction<TODO[]>>;
}

const TodoInput = ({TODOs,setTODOs}: props) => {
    const [input,setInput] =useState('');

    const handleAdd = () =>{
        if(input.trim() === '') return;

        const newTODO: TODO ={
            id:Date.now(),
            text:input,
            completed:false,

        };
        setTODOs([...TODOs, newTODO]);
       setInput('');
    };

//추가버튼 누르면
    const Submit = (e: React.FormEvent)=>{
        e.preventDefault();
        handleAdd();
    };

    return (
        <form className="todo-container__form" onSubmit={Submit}>
        <input className="todo-container__input" type="text" placeholder="할일을 입력해보세요!" 
        value={input} onChange={(e) => setInput(e.target.value)}/>
        <button className="todo-container__button" type='submit'>추가</button>
    </form>
    );
};

export default TodoInput;