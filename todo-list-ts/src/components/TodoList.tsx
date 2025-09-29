import TodoItem from "./TodoItem";
import { useTodos } from "../queries/todos";

type Props = { mode: "doing" | "done" };

export default function TodoList({ mode }: Props) {
  const { data, isLoading, isError } = useTodos();

  if (isLoading)
    return (
      <ul className="render-container__list">
        <li>불러오는 중…</li>
      </ul>
    );
  if (isError)
    return (
      <ul className="render-container__list">
        <li>목록을 불러오지 못했습니다.</li>
      </ul>
    );

  const items = (data ?? []).filter((t) =>
    mode === "doing" ? !t.completed : t.completed
  );

  if (!items.length) return <ul className="render-container__list" />;

  return (
    <ul className="render-container__list">
      {items.map((t) => (
        <TodoItem key={t.id} todo={t} mode={mode} />
      ))}
    </ul>
  );
}
