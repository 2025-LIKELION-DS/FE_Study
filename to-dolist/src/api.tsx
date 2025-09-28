import { Todo } from './types';

const BASE_URL='https://jsonplaceholder.typicode.com/todos/'

//쿼리 키
export const todoKeys = {
  all: ['todos'] as const,
  lists: () => [...todoKeys.all, 'list'] as const,
};

//get으로 불러오기
export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(`${BASE_URL}?_limit=10`); // 최대 10개
  if (!response.ok) {
    throw new Error('To-do List를 불러오는데 실패했습니다.');
  }
  const todos: Todo[] = await response.json();
  return todos;
}

//post로 할일 추가
export async function addTodo(title: string): Promise<Todo> {
  const newTodo = {
    title,
    userId: 1, // 임의의 userId
    completed: false,
  };

  const response = await fetch(BASE_URL, {
    method: 'POST',
    body: JSON.stringify(newTodo),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  if (!response.ok) {
    throw new Error('To-do List 추가에 실패했습니다.');
  }

  const addedTodo: Todo = await response.json();
  return addedTodo; 
}

//patch로 완료여부 확인
export async function updateTodoStatus(id: number, isCompleted: boolean): Promise<Todo> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      completed: isCompleted,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });

  if (!response.ok) {
    throw new Error('To-do List 업데이트에 실패했습니다.');
  }

  return response.json();
}

//delete로 할일 삭제
export async function deleteTodo(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('To-do List 삭제에 실패했습니다.');
  }
}