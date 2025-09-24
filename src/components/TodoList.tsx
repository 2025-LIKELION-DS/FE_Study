// src/components/TodoList.tsx
import React from 'react';
import type { Todo } from '../types';
import TodoItem from './TodoItem';

interface TodoListProps {
  title: string;
  todos: Todo[];
  onToggle: (todo: Todo) => void;
  onDelete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ title, todos, onToggle, onDelete }) => {
  return (
    <section className="render-container__section">
      <h2 className="render-container__title">{title}</h2>
      <ul className="render-container__list">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </section>
  );
};

export default TodoList;