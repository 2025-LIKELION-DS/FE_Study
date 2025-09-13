import React from 'react';

interface TODO {
  id: number;
  text: string;
  completed: boolean;
}

interface Props {
  todo: TODO;
  Complete: (id: number) => void;
}

const TodoItem = ({ todo, Complete}: Props) => {
  return (
    <div className="render-container__item">
      <span className='render-container__item-text'>{todo.text}</span>
      <button
        className={`render-container__item-button ${todo.completed ?  'delete':'complete' }`}
        onClick={() => Complete(todo.id)}
      >
        {todo.completed ? '삭제' : '완료'}
      </button>
    </div>
  );
};

export default TodoItem;
