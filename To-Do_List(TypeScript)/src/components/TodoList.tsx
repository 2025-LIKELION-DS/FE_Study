import React from "react";
import TodoItem from "../components/TodoItem"

interface props {
    title: string;
    items: string[];
    onComplete?: (index: number)=> void;
    onDelete?: (index: number) => void;
    type: "todo" | "completed";
}

function TodoList({ title, items, onComplete, onDelete, type }: props){
    return(
        <div className="render-container__section">
            <div className="render-container__title"> {title} </div>
            <ul className="render-container__list">
                {items.map((item,index) => (
                    <TodoItem key={index} text={item} onComplete={() => onComplete?.(index)} onDelete={() => onDelete?.(index)} type={type} ></TodoItem>
                ))}
            </ul>
        </div>
    )
}

export default TodoList
