import React from "react";
import TodoItem from "./TodoItem";

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

interface TodoListProps {
    title: string;
    items: Todo[];
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
}

const TodoList = ({ title, items, onToggle, onDelete }: TodoListProps) => {
    return (
        <div className="render-container__section">
            <div className="render-container__title">{title}</div>
            <ul className="render-container__list">
                {items.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        id={todo.id}
                        text={todo.text}
                        completed={todo.completed}
                        onToggle={onToggle}
                        onDelete={onDelete}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
