import './App.css'
import './style.css'
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

const BASE_URL = "https://jsonplaceholder.typicode.com/todos";


function App() {
  const queryClient = useQueryClient();

  const { data: todos, isLoading, isError } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await fetch(BASE_URL + "?_limit=10");
      if (!res.ok) throw new Error("불러오기 실패");
      return res.json();
    },
  });

  const deleteMutation = useMutation({
    mutationFn : async (id: number) => {
      const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("삭제 실패");
    },
    onSuccess: () => {
      // 삭제 후 목록 다시 불러오기
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const toggleMutation = useMutation({
  mutationFn: async (todo: Todo): Promise<Todo> => {
      const res = await fetch(`${BASE_URL}/${todo.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !todo.completed }),
      });
      if (!res.ok) throw new Error("업데이트 실패");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  if (isLoading) return <p>⏳ 로딩중...</p>;
  if (isError) return <p>❌ 에러 발생!</p>;

    return (
    <>
      <div className='todo-container'>
        <div className='todo-container__header'> 🦁 LIKELION TO-DO </div>
        {/*입력창!*/}
        <TodoInput/>

        {/*리스트 부분*/}
        <div className='render-container'>
            <TodoList title="할 일" 
            items={todos?.filter((t) => !t.completed) || []}
            onComplete={(index) => {
              const todo = todos?.filter((t) => !t.completed)[index];
              if (todo) toggleMutation.mutate(todo);
            }}
            type="todo"></TodoList>
            <TodoList title="완료"  
            items={todos?.filter((t) => t.completed) || []} 
            onDelete={(index) => { 
            const todo = todos?.filter((t) => t.completed)[index]; 
            if (todo) deleteMutation.mutate(todo.id);}}type="completed"></TodoList>
        </div>
      </div>
    </>
  )
}

export default App
