import React, {memo} from 'react'
import { Todo } from '../types';

type TodoItemProps = {
    item : Todo;
    onComplete?: (id:number) => void;
    onDelete?: (id:number) => void;
}

function TodoItem({ item, onComplete, onDelete }: TodoItemProps) {
  return (
    <li className="render-container__item">
        <span className='render-container__item-text'>{item.title}</span>
        {onComplete && (
            <button className='render-container__item-button complete' onClick={() => onComplete(item.id)}>
            완료
            </button>
        )}
        {onDelete && (
            <button className='render-container__item-button delete' onClick={() => onDelete(item.id)}>
            삭제
            </button>
        )}
    </li>
  )
}

export default memo(TodoItem);