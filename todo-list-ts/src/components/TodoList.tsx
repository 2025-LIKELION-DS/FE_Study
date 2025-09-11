import TodoItem from "./TodoItem";
import type { Todo } from "../App";

type DoingProps = {
  mode: "doing";
  items: Todo[];
  onDone: (id: string) => void;
};

type DoneProps = {
  mode: "done";
  items: Todo[];
  onDelete: (id: string) => void;
};

export default function TodoList(props: DoingProps | DoneProps) {
  if (!props.items.length) {
    return <ul className="render-container__list" />;
  }

  return (
    <ul className="render-container__list">
      {props.items.map((t) => {
        if (props.mode === "doing") {
          return (
            <TodoItem
              key={t.id}
              text={t.text}
              mode="doing"
              onDone={() => props.onDone(t.id)}
            />
          );
        } else {
          return (
            <TodoItem
              key={t.id}
              text={t.text}
              mode="done"
              onDelete={() => props.onDelete(t.id)}
            />
          );
        }
      })}
    </ul>
  );
}
