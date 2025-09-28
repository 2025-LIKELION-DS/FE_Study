import React, { useCallback, useMemo } from 'react';
import './style.css';
import TodoInput  from './components/TodoInput';
import TodoList from './components/TodoList';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTodos, addTodo, updateTodoStatus, deleteTodo, todoKeys } from './api'; 

function App() {
  const queryClient = useQueryClient();

  const { 
    data: allTodos, 
    isLoading, 
    isError,
    error
  } = useQuery({
    queryKey: todoKeys.lists(), 
    queryFn: getTodos, 
  });
  
  const todoItems = useMemo(() => {
    return (allTodos || [])
      .filter((todo) => !todo.completed); // 미완료
  }, [allTodos]);

  const completeItems = useMemo(() => {
    return (allTodos || [])
      .filter((todo) => todo.completed); // 완료
  }, [allTodos]);

  const addMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoKeys.lists() }); 
    },
  });

  const handleAddTodo = useCallback((title: string) => {
    addMutation.mutate(title);
  }, [addMutation]);

  const completeMutation = useMutation({
    mutationFn: (id: number) => updateTodoStatus(id, true), 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoKeys.lists() });
    },
  });

  const handleCompleteTodo = useCallback((id: number) => {
    completeMutation.mutate(id);
  }, [completeMutation]);

  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: todoKeys.lists() });
    },
  });

  const handleDeleteCompleted = useCallback((id: number) => {
    deleteMutation.mutate(id);
  }, [deleteMutation]);

  

  if (isLoading) return <main><div className='todo-container'><p>To-do List를 불러오고 있습니다.</p></div></main>;
  if (isError) return <main><div className='todo-container'><p>에러: {error.message}</p></div></main>;

  return (
    <main>
      <div className='todo-container'>
        <p className='todo-container__header'>🦁LIKELION TO-DO</p>
        <TodoInput 
          onAdd={handleAddTodo}
          isAdding={addMutation.isPending} 
        /> 
        
        <div className='render-container'>
          <TodoList 
            title="할 일" 
            items={todoItems} 
            onComplete={handleCompleteTodo}
          />
          <TodoList 
            title="완료" 
            items={completeItems} 
            onDelete={handleDeleteCompleted}
          />
        </div>
      </div>
    </main>
  );
}

export default App;
