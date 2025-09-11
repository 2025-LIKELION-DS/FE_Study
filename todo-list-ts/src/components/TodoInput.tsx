import { useState } from "react";

type Props = { onAdd: (text: string) => void };

export default function TodoInput({ onAdd }: Props) {
  const [text, setText] = useState("");

  const submit = () => {
    onAdd(text);
    setText("");
  };

  return (
    <div className="todo-container__form">
      <input
        className="todo-container__input"
        placeholder="할 일을 입력해보세요!"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") submit();
        }}
      />
      <button className="todo-container__button" onClick={submit}>
        추가
      </button>
    </div>
  );
}
