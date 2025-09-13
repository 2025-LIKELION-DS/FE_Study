import React from 'react';
import TodoItem from './TodoItem';

interface TODO {
  id: number;
  text: string;
  completed: boolean;
}

interface Props {
  todos: TODO[];
  Complete: (id: number) => void;
}

const TodoList = ({ todos, Complete }: Props) => {
  return (
    <div className="render-container__list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} Complete={Complete} />
      ))}
    </div>
  );
};

export default TodoList;
