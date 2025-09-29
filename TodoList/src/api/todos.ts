import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface Todo {
userId: number;
id: number; 
title: string;
completed: boolean; 
}

const BASE_URL = 'https://jsonplaceholder.typicode.com';


const fetchTodos = async (): Promise<Todo[]> => {
const response = await fetch(`${BASE_URL}/todos?_limit=10`); 
if (!response.ok) {
throw new Error('할 일 목록을 불러오는 데 실패했습니다.');
 }
 return response.json();
};


const createTodo = async (newTodoTitle: string): Promise<Todo> => {
const response = await fetch(`${BASE_URL}/todos`, {
 method: 'POST',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({
title: newTodoTitle,
completed: false,
userId: 1,
 }),
});
if (!response.ok) {
 throw new Error('할 일 추가에 실패했습니다.');
 }
 return response.json();
};

const deleteTodoApi = async (todoId: number): Promise<void> => {
 const response = await fetch(`${BASE_URL}/todos/${todoId}`, {
 method: 'DELETE',
 });
 if (!response.ok) {
 throw new Error('할 일 삭제에 실패했습니다.');
}
};

const updateTodoCompletion = async (todo: Todo): Promise<Todo> => {
 const response = await fetch(`${BASE_URL}/todos/${todo.id}`, {
 method: 'PATCH',
 headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify({
 completed: !todo.completed, 
 }),
});
if (!response.ok) {
 throw new Error('할 일 상태 업데이트에 실패했습니다.');
}
return response.json();
};



export const useTodos = () => {
 return useQuery<Todo[], Error>({
 queryKey: ['todos'],
queryFn: fetchTodos,
 });
};

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<Todo, Error, string, { previousTodos?: Todo[] }>({
    mutationFn: createTodo,
    onMutate: async (newTitle) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });

      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']);

      const tempTodo: Todo = {
        id: Date.now(), 
        userId: 1,
        title: newTitle,
        completed: false,
      };

      queryClient.setQueryData<Todo[]>(['todos'], (old) =>
        old ? [...old, tempTodo] : [tempTodo]
      );

      return { previousTodos };
    },
    onError: (_err, _newTitle, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos);
      }
    },
    onSuccess: (addedTodo, _newTitle, context) => {
      const todos = queryClient.getQueryData<Todo[]>(['todos']);
      if (todos) {
        queryClient.setQueryData(
          ['todos'],
          todos.map((todo) =>
            todo.id === addedTodo.id ? addedTodo : todo
          )
        );
      }
    },
  });
};
export const useDeleteTodo = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, number, { previousTodos?: Todo[] }>({
    mutationFn: deleteTodoApi,
    onMutate: async (todoId) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });
  
      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']);
  
      queryClient.setQueryData<Todo[]>(['todos'], (old) =>
        old ? old.filter((todo) => todo.id !== todoId) : []
      );
  
      return { previousTodos }; 
    },
    onError: (_err, _todoId, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos);
      }
    },
  });
};
export const useToggleTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<Todo, Error, Todo, { previousTodos?: Todo[] }>({
    mutationFn: updateTodoCompletion,
    onMutate: async (toggledTodo) => {
      await queryClient.cancelQueries({ queryKey: ['todos'] });

      const previousTodos = queryClient.getQueryData<Todo[]>(['todos']);

      queryClient.setQueryData<Todo[]>(['todos'], (old) =>
        old
          ? old.map((todo) =>
              todo.id === toggledTodo.id
                ? { ...todo, completed: !todo.completed }
                : todo
            )
          : []
      );

      return { previousTodos };
    },
    onError: (_err, _todo, context) => {
      if (context?.previousTodos) {
        queryClient.setQueryData(['todos'], context.previousTodos);
      }
    },
  });
};

