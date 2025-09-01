import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import "./styles/style.css";

function App() {
  return (
    <>
      <div className='todo-container'>
        <div className='todo-container__header'>🦁 LIKELION TO-DO</div>
        <TodoInput />
        <TodoList />
      </div>
    </>
  );
}

export default App;
