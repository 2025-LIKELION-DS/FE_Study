type Props =
  | { text: string; mode: "doing"; onDone: () => void; onDelete?: never }
  | { text: string; mode: "done"; onDelete: () => void; onDone?: never };

export default function TodoItem(props: Props) {
  return (
    <li className="render-container__item">
      <span className="render-container__item-text">{props.text}</span>

      <div>
        {props.mode === "doing" && (
          <button
            className="render-container__item-button complete"
            onClick={props.onDone}
          >
            완료
          </button>
        )}

        {props.mode === "done" && (
          <button
            className="render-container__item-button delete"
            onClick={props.onDelete}
          >
            삭제
          </button>
        )}
      </div>
    </li>
  );
}
