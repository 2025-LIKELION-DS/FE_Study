import { memo, useCallback } from "react";
import type { CompleteTodo, DeleteTodo, Todo } from "../types/todo.types";

function TodoItem({
  todo,
  completeTodo,
  deleteTodo,
}: {
  todo: Todo;
  completeTodo: CompleteTodo;
  deleteTodo: DeleteTodo;
}) {
  // useCallback으로 완료, 삭제 로직 렌더 최적화
  const onComplete = useCallback(
    () => completeTodo(todo.id),
    [completeTodo, todo.id]
  );
  const onDelete = useCallback(
    () => deleteTodo(todo.id),
    [deleteTodo, todo.id]
  );

  return (
    <div className='render-container__item'>
      <div className='render-container__item-text'>{todo.title}</div>
      {todo.completed ? (
        // 완료된 투두 === "완료" 목록에 들어가며, 삭제 버튼만 뜸
        <button
          className='render-container__item-button delete'
          onClick={onDelete}
        >
          삭제
        </button>
      ) : (
        // 완료되지 않은 투두 === "할 일" 목록에 들어가며, 완료 버튼만 뜸
        <button
          className='render-container__item-button complete'
          onClick={onComplete}
        >
          완료
        </button>
      )}
    </div>
  );
}

// 컴포넌트 단위 메모이제이션은 useMemo 말고 memo
export default memo(TodoItem);
