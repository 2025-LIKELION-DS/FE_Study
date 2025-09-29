import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTodo } from '../api/todos';
import type { Todo } from '../types/todo';

function TodoInput() {
    const [text, setText] = useState('');
    const queryClient = useQueryClient();

    // ✅ 추가 (낙관적 업데이트 + invalidate)
    const addMutation = useMutation({
        mutationFn: (newTodo: { title: string; completed: boolean }) => addTodo(newTodo as Omit<Todo, 'id'>),
        onMutate: async (vars) => {
            await queryClient.cancelQueries({ queryKey: ['todos'] });
            const prev = queryClient.getQueryData<Todo[]>(['todos']);
            if (prev) {
                const fakeId = Math.max(...prev.map(t => t.id)) + 1;
                queryClient.setQueryData<Todo[]>(
                    ['todos'],
                    [{ id: fakeId, title: vars.title, completed: vars.completed }, ...prev],
                );
            }
            return { prev };
        },
        onError: (_err, _vars, ctx) => {
            if (ctx?.prev) queryClient.setQueryData(['todos'], ctx.prev);
        },
        onSuccess: () => setText(''),
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] });
        },
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const trimmed = text.trim();
        if (!trimmed) return;
        addMutation.mutate({ title: trimmed, completed: false });
    };

    return (
        <form className="todo-container__form" onSubmit={handleSubmit}>
            <input
                className="todo-container__input"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="할 일을 입력하세요"
                aria-label="할 일 입력"
            />
            <button className="todo-container__button" type="submit">
                추가
            </button>
        </form>
    );
}

export default TodoInput;
