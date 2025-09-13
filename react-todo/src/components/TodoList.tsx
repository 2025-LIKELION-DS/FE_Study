import React from 'react';
import TodoItem from './TodoItem';
import type { Todo } from '../App';

export interface TodoListProps {
    title: string;
    items: Todo[];
    type: 'todo' | 'done';
    onComplete?: (id: string) => void;
    onDelete?: (id: string) => void;
}

function TodoList({ title, items, type, onComplete, onDelete }: TodoListProps) {
    return (
        <section className="render-container__section">
            <h3 className="render-container__title">{title}</h3>
            <ul className="render-container__list">
                {items.map((t) => (
                    <TodoItem
                        key={t.id}
                        todo={t}
                        type={type}
                        onComplete={onComplete}
                        onDelete={onDelete}
                    />
                ))}
            </ul>
        </section>
    );
}

export default TodoList;
