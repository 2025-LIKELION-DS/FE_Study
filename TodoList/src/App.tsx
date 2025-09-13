import { useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

interface TODO {
  id: number;
  text: string;
  completed: boolean;
}

const App = () => {
  const [todos, setTodos] = useState<TODO[]>([]);


  const handleComplete = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: true } : todo
      )
    );
  };


  const handleDelete = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };


  const  Complete = (id: number) => {
    const target = todos.find(t => t.id === id);
    if (!target) return;

    if (target.completed) {
      handleDelete(id);
    } else {
      handleComplete(id); 
    }
  };

  return (
    <div className="todo-container">
      <h1 className="todo-container__header">🦁LIKELION TO-DO</h1>

      <TodoInput TODOs={todos} setTODOs={setTodos} />

      <div className="render-container">
  
        <div className="render-container__section">
          <div className="render-container__title">할 일</div>
          <TodoList todos={todos.filter(t => !t.completed)} Complete={Complete} />
        </div>


        <div className="render-container__section">
          <div className="render-container__title">완료</div>
          <TodoList todos={todos.filter(t => t.completed)} Complete={Complete} />
        </div>
      </div>
    </div>
  );
};

export default App;
