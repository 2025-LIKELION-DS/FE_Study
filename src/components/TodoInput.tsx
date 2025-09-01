export default function TodoInput() {
  return (
    <form className='todo-container__form'>
      <input
        className='todo-container__input'
        placeholder='할 일을 입력해보세요!'
      />
      <button className='todo-container__button'>추가</button>
    </form>
  );
}
