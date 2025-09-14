import React,{ useState,useCallback } from 'react';
import './style.css';
import TodoInput  from './components/TodoInput';
import TodoList from './components/TodoList';
import { Todo } from './types';

function App() {
  const [todo,setTodo] = useState<Todo[]>([]);
  const [complete,setComplete] = useState<Todo[]>([]);

  const addTodo = useCallback((text: string) => {
    setTodo((prev) => [...prev, { id: Date.now(), text }]);
  }, []);

  const completeTodo = useCallback((id: number) =>{
    const target = todo.find((t) => t.id === id);
    if (!target) return;

    
    setTodo((prev) => prev.filter((t) => t.id !== id));
    setComplete((prev) => [...prev, target]);
  },[todo]);

  const deleteCompleted = useCallback((id: number) => {
    setComplete((prev) => prev.filter((t) => t.id !== id));
  },[]);

  return (
    <main>
      <div className='todo-container'>
        <p className='todo-container__header'>🦁LIKELION TO-DO</p>
        <TodoInput onAdd={addTodo}></TodoInput>
        <div className='render-container'>
          <TodoList title="할 일" items={todo} onComplete={completeTodo}></TodoList>
          <TodoList title="완료" items={complete} onDelete={deleteCompleted}></TodoList>
        </div>
      </div>
    </main>
  );
}

export default App;
