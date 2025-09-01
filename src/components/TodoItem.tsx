export default function TodoItem() {
  return (
    <div className='render-container__item'>
      <div className='render-container__item-text'>할 일 항목</div>
      {/* 완료되지 않은 투두 === "할 일" 목록에 들어가며, 완료 버튼만 뜸 */}
      <button className='render-container__item-button complete'>완료</button>
      {/* 완료된 투두 === "완료" 목록에 들어가며, 삭제 버튼만 뜸 */}
      <button className='render-container__item-button delete'>삭제</button>
    </div>
  );
}
