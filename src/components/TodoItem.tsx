import { useMutation, useQueryClient } from '@tanstack/react-query';
import { completeTodo, deleteTodo } from '../api/todos';
import type { Todo } from '../types/todo';

export interface TodoItemProps {
    todo: Todo;
    type: 'todo' | 'done';
}

function TodoItem({ todo, type }: TodoItemProps) {
    const queryClient = useQueryClient();

    // ✅ 완료 토글 (낙관적 업데이트)
    const completeMutation = useMutation({
        mutationFn: (next: boolean) => completeTodo(todo.id, next),
        onMutate: async (next: boolean) => {
            await queryClient.cancelQueries({ queryKey: ['todos'] });
            const prev = queryClient.getQueryData<Todo[]>(['todos']);
            if (prev) {
                queryClient.setQueryData<Todo[]>(
                    ['todos'],
                    prev.map(t => (t.id === todo.id ? { ...t, completed: next } : t)),
                );
            }
            return { prev };
        },
        onError: (_err, _vars, ctx) => {
            if (ctx?.prev) queryClient.setQueryData(['todos'], ctx.prev); // 롤백
        },
        onSettled: () => {
            // 과제 요구사항 충족을 위해 성공 후 invalidate (실제 서버는 반영 X)
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
    });

    // ✅ 삭제 (낙관적 업데이트)
    const deleteMutation = useMutation({
        mutationFn: () => deleteTodo(todo.id),
        onMutate: async () => {
            await queryClient.cancelQueries({ queryKey: ['todos'] });
            const prev = queryClient.getQueryData<Todo[]>(['todos']);
            if (prev) {
                queryClient.setQueryData<Todo[]>(
                    ['todos'],
                    prev.filter(t => t.id !== todo.id),
                );
            }
            return { prev };
        },
        onError: (_err, _vars, ctx) => {
            if (ctx?.prev) queryClient.setQueryData(['todos'], ctx.prev);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
    });

    return (
        <li className="render-container__item">
            <span
                className="render-container__item-text"
                style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
            >
                {todo.title}
            </span>

            {type === 'todo' ? (
                <button
                    type="button"
                    className="render-container__item-button complete"
                    onClick={() => completeMutation.mutate(true)}
                >
                    완료
                </button>
            ) : (
                <button
                    type="button"
                    className="render-container__item-button delete"
                    onClick={() => deleteMutation.mutate()}
                >
                    삭제
                </button>
            )}
        </li>
    );
}

export default TodoItem;
