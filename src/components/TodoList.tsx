import TodoItem from "./TodoItem";

export default function TodoList() {
  return (
    <div className='render-container'>
      {/* 완료되지 않은 투두 - 완료 버튼 */}
      <div className='render-container__section'>
        <div className='render-container__title'>할 일</div>
        <div className='render-container__list'>
          <TodoItem />
        </div>
      </div>
      {/* 완료된 투두 - 삭제 버튼 */}
      <div className='render-container__section'>
        <div className='render-container__title'>완료</div>
        <div className='render-container__list'>
          <TodoItem />
        </div>
      </div>
    </div>
  );
}
