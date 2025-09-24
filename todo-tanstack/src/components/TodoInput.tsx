import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/client";
import type { Todo } from "../types/todo";

export default function TodoInput() {
    const [input, setInput] = useState("");
    const queryClient = useQueryClient();

  // 할 일 추가 (POST /todos)
    const addTodoMutation = useMutation({
        mutationFn: async (title: string) => {
        const { data } = await api.post<Todo>("/todos", {
            userId: 1,
            title,
            completed: false,
        });
        return data;
        },
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });

    const handleAdd = () => {
        if (!input.trim()) return;
        addTodoMutation.mutate(input);
        setInput("");
    };

    return (
        <div className="todo-container__form">
        <input
            className="todo-container__input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="할 일을 입력해보세요!"
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
        />
        <button className="todo-container__button" onClick={handleAdd}>
            추가
        </button>
        </div>
    );
}
