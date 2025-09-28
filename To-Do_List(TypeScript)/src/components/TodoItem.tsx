import React from "react";

interface props {
    text: string;
    onComplete?: ()=> void;
    onDelete?: () => void;
    type: "todo" | "completed";
}

function TodoItem({ text, onComplete, onDelete, type }: props){
    return(
        <li className="render-container__item">
            <span className='render-container__item-text'>{text}</span>
            
            {type === "todo" && (
                <button className="render-container__item-button-complete" onClick={onComplete}>완료</button>
            )}

            {type === "completed" && (
                <button className="render-container__item-button-delete" onClick={onDelete}>삭제</button>
            )}

        </li>
    )
}
export default TodoItem
