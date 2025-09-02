import { useState } from "react";
import type { AddTodo } from "../types/todo.types";

export default function TodoInput({ addTodo }: { addTodo: AddTodo }) {
  const [todo, setTodo] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo.trim()) {
      addTodo(todo);
      setTodo("");
    }
  };

  return (
    <form className='todo-container__form' onSubmit={handleSubmit}>
      <input
        type='text'
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        className='todo-container__input'
        placeholder='할 일을 입력해보세요!'
      />
      <button className='todo-container__button' type='submit'>
        추가
      </button>
    </form>
  );
}
