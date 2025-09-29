import TodoItem from "./TodoItem";
import type { Todo } from "../types/todo";

interface TodoListProps {
  title: string;
  items: Todo[];
}

export default function TodoList({ title, items }: TodoListProps) {
  return (
    <div className="render-container__section">
      <div className="render-container__title">{title}</div>
      <ul className="render-container__list">
        {items.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
          />
        ))}
      </ul>
    </div>
  );
}
