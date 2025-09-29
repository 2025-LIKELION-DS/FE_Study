import { useState } from "react";
import './App.css'
import './style.css'
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState<string[]>([]);
  const [completed, setCompleted] = useState<string[]>([]);

  return (
    <>
      <div className='todo-container'>
        <div className='todo-container__header'> 🦁 LIKELION TO-DO </div>
        {/*입력창!*/}
        <TodoInput onAdd={ (newTodo ) => setTodos([...todos, newTodo])}></TodoInput>

        {/*리스트 부분*/}
        <div className='render-container'>
            <TodoList title="할 일" items={todos} onComplete={(index) => {const newTodos =[...todos]; const [done] =newTodos.splice(index, 1); setTodos(newTodos); setCompleted([...completed,done]);}} type="todo"></TodoList>
            <TodoList title="완료" items={completed} onDelete={(index) => {const newCompleted =[...completed]; newCompleted.splice(index, 1); setCompleted(newCompleted);}} type="completed"></TodoList>
        </div>
      </div>
    </>
  )
}

export default App
