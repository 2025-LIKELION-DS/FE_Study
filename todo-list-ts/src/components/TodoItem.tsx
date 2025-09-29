import type { Todo } from "../types/todo";
import { useDeleteTodo, useToggleTodo } from "../queries/todos";

type Props = { todo: Todo; mode: "doing" | "done" };

export default function TodoItem({ todo, mode }: Props) {
  const del = useDeleteTodo();
  const toggle = useToggleTodo();

  return (
    <li className="render-container__item">
      <span className="render-container__item-text">{todo.title}</span>

      <div>
        {mode === "doing" && (
          <button
            className="render-container__item-button complete"
            onClick={() =>
              toggle.mutate({ id: todo.id, completed: !todo.completed })
            }
            disabled={toggle.isPending}
          >
            {toggle.isPending ? "처리 중..." : "완료"}
          </button>
        )}

        {mode === "done" && (
          <button
            className="render-container__item-button delete"
            onClick={() => del.mutate(todo.id)}
            disabled={del.isPending}
          >
            {del.isPending ? "삭제 중..." : "삭제"}
          </button>
        )}
      </div>
    </li>
  );
}
