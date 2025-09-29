import axios from 'axios';
import type { Todo } from '../types/todo';

const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

// 전체 Todo 목록 가져오기 (갯수 제한)
export const fetchTodos = async (): Promise<Todo[]> => {
    const res = await axios.get<Todo[]>(BASE_URL, {
        params: {
            _limit: 12,      // 👈 한 번에 12개만
            _sort: 'id',
            _order: 'asc',
        },
    });
    return res.data;
};

// 새로운 Todo 추가
export const addTodo = async (newTodo: Omit<Todo, 'id'>): Promise<Todo> => {
    const res = await axios.post<Todo>(BASE_URL, newTodo);
    return res.data; // JSONPlaceholder는 보통 { id: 201, ... } 형태로 응답
};

// Todo 완료 처리 (값을 토글로 전송)
export const completeTodo = async (id: number, completed: boolean): Promise<void> => {
    await axios.patch(`${BASE_URL}/${id}`, { completed });
};

// Todo 삭제
export const deleteTodo = async (id: number): Promise<void> => {
    await axios.delete(`${BASE_URL}/${id}`);
};
