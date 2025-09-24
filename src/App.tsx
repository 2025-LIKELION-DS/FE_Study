// src/App.tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTodos, addTodo, updateTodo, deleteTodo } from './api/todos';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import './style.css';

const App: React.FC = () => {
  const queryClient = useQueryClient();

  // GET (useQuery)
  const { data: todos, isLoading, isError } = useQuery({
    queryKey: ['todos'],
    queryFn: getTodos,
  });

  // POST (useMutation)
  const addMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
     
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });


  const updateMutation = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });


  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const handleAddTodo = (title: string) => {
    addMutation.mutate({ title, completed: false, userId: 1 });
  };

  const handleToggleTodo = (todo: Todo) => {
    updateMutation.mutate({ ...todo, completed: !todo.completed });
  };

  const handleDeleteTodo = (id: number) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러가 발생했습니다.</div>;

  const workingTodos = todos?.filter((todo) => !todo.completed) || [];
  const doneTodos = todos?.filter((todo) => todo.completed) || [];

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">🦁 LIKELION TO-DO </h1>
      <TodoInput onAdd={handleAddTodo} />
      <div className="render-container">
        <TodoList
          title="할 일 🔥"
          todos={workingTodos}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
        />
        <TodoList
          title="완료 ✅" 
          todos={doneTodos}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
        />
      </div>
    </div>
  );
};

export default App;