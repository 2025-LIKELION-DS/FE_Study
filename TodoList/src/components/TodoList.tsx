import React from 'react';
import TodoItem from './TodoItem';
import { type Todo } from '../api/todos';
import './style.css';

interface Props {
    todos: Todo[];
  }


  const TodoList = ({ todos }: Props) => {
    return (
      <div className="render-container__list">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    );
  };
  
export default TodoList;