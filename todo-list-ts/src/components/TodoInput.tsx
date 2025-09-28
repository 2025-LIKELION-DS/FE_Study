import { useState } from "react";
import { useAddTodo } from "../queries/todos";

export default function TodoInput() {
  const [text, setText] = useState("");
  const add = useAddTodo();

  const submit = () => {
    const t = text.trim();
    if (!t || add.isPending) return;
    add.mutate({ title: t }, { onSuccess: () => setText("") });
  };

  return (
    <div className="todo-container__form">
      <input
        className="todo-container__input"
        placeholder="할 일을 입력해보세요!"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && submit()}
        disabled={add.isPending}
      />
      <button
        className="todo-container__button"
        onClick={submit}
        disabled={add.isPending}
      >
        {add.isPending ? "추가 중..." : "추가"}
      </button>
    </div>
  );
}
