import React,  { memo } from 'react'
import TodoItem from './TodoItem';
import { Todo } from '../types';

type TodoListProps={
    title:string;
    items:Todo[];
    onComplete?: (id:number) => void;
    onDelete?: (id:number) => void;
};

function TodoList({ title, items, onComplete, onDelete }: TodoListProps) {
  return (
    <section className='render-container__section'>
        <p className='render-container__title'>{title}</p>
        <ul className='render-container__list'>
            {items.map((item)=> (
                <TodoItem
                key={item.id}
                item={item}
                onComplete={onComplete}
                onDelete={onDelete}
                />
            ))}
        </ul>
    </section>
  )
}

export default memo(TodoList)