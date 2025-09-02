import type { CompleteTodo, DeleteTodo, Todo } from "../types/todo.types";

export default function TodoItem({
  todo,
  completeTodo,
  deleteTodo,
}: {
  todo: Todo;
  completeTodo: CompleteTodo;
  deleteTodo: DeleteTodo;
}) {
  return (
    <div className='render-container__item'>
      <div className='render-container__item-text'>{todo.todo}</div>
      {todo.done ? (
        // 완료된 투두 === "완료" 목록에 들어가며, 삭제 버튼만 뜸
        <button
          className='render-container__item-button delete'
          onClick={() => deleteTodo(todo.id)}
        >
          삭제
        </button>
      ) : (
        // 완료되지 않은 투두 === "할 일" 목록에 들어가며, 완료 버튼만 뜸
        <button
          className='render-container__item-button complete'
          onClick={() => completeTodo(todo.id)}
        >
          완료
        </button>
      )}
    </div>
  );
}
