import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../api/client";

interface TodoItemProps {
    id: number;
    title: string;
    completed: boolean;
}

export default function TodoItem({ id, title, completed }: TodoItemProps) {
    const queryClient = useQueryClient();

    // 👉 할 일 완료 (PATCH /todos/:id)
    const toggleMutation = useMutation({
        mutationFn: async () =>
        api.patch(`/todos/${id}`, { completed: !completed }),
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });

  // 할 일 삭제 
    const deleteMutation = useMutation({
        mutationFn: async () => api.delete(`/todos/${id}`),
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["todos"] });
        },
    });

    return (
        <li className="render-container__item">
        <span
            className="render-container__item-text"
        >
            {title}
        </span>

        {!completed ? (
            <button
            className="render-container__item-button complete"
            onClick={() => toggleMutation.mutate()}
            >
            완료
            </button>
        ) : (
            <button
            className="render-container__item-button delete"
            onClick={() => deleteMutation.mutate()}
            >
            삭제
            </button>
        )}
        </li>
    );
}
