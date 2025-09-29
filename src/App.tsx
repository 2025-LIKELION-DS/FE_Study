import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import './style.css';

// ✅ QueryClient 생성 (옵션 추가 가능)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="todo-container">
        <h1 className="todo-container__header">🦁 LIKELION TO-DO</h1>
        <TodoInput />
        <div className="render-container">
          <TodoList title="할 일" />
          <TodoList title="완료" />
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
