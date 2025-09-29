import { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const BASE_URL = "https://jsonplaceholder.typicode.com/todos";

function TodoInput() {
    const inputRef = useRef<HTMLInputElement>(null);
    const queryClient = useQueryClient();

  // ✅ POST /todos 요청
    const addMutation = useMutation({
    mutationFn: async (title: string): Promise<Todo> => {
        const res = await fetch(BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: 1, title, completed: false }),
        });
        return res.json();
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["todos"] });
        if (inputRef.current) inputRef.current.value = "";
    },
});

    const Submit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputRef.current && inputRef.current.value.trim())
            addMutation.mutate(inputRef.current.value);
    };

    return (
    <form className="todo-container__form" onSubmit={Submit}>
        <input
            ref={inputRef}
            type="text"
            placeholder="할 일을 입력해보세요!"
            className="todo-container__input"
        />
        <button className="todo-container__button" type="submit">
            추가
        </button>
        </form>
    );
}

export default TodoInput;
