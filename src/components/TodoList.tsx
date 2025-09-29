import TodoItem from './TodoItem';
import { useQuery } from '@tanstack/react-query';
import { fetchTodos } from '../api/todos';
import type { Todo } from '../types/todo';

export interface TodoListProps {
    title: string; // "할 일" 또는 "완료"
}

function TodoList({ title }: TodoListProps) {
    const { data = [], isLoading, isError } = useQuery<Todo[]>({
        queryKey: ['todos'],
        queryFn: fetchTodos,
        staleTime: 1000 * 10,
        gcTime: 1000 * 60 * 5,
    });

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading todos</div>;

    const items =
        title === '할 일' ? data.filter((t) => !t.completed) : data.filter((t) => t.completed);

    return (
        <section className="render-container__section">
            <h3 className="render-container__title">{title}</h3>
            <ul className="render-container__list">
                {items.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} type={title === '할 일' ? 'todo' : 'done'} />
                ))}
            </ul>
        </section>
    );
}

export default TodoList;
