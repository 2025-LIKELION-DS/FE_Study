import TodoItem from "../components/TodoItem"
import type { Todo } from "../App";

interface props {
    title: string;
    items:Todo[];
    onComplete?: (index: number)=> void;
    onDelete?: (index: number) => void;
    type: "todo" | "completed";
}

function TodoList({ title, items, onComplete, onDelete, type }: props){
    return(
        <div className="render-container__section">
            <div className="render-container__title"> {title} </div>
            <ul className="render-container__list">
                {items.map((todo, index) => (
                    <TodoItem key={todo.id} todo={todo} onComplete={() => onComplete?.(index)} onDelete={() => onDelete?.(index)} type={type}/>
))}

            </ul>
        </div>
    )
}

export default TodoList
