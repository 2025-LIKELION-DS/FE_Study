<!-- PR의 제목은 "[날짜] 과제 내용 - 이름" 과 같이 작성해주세요! -->

## 🦁 아기사자

- 이름:최솔
- 스터디 팀:2팀

## ✅ TypeScript 활용 설명
과제에서 사용한 TypeScript 관련 기술, 기능 또는 특정 구현 방법을 설명해주세요.
>
-type.tsx에서 타입 별칭으로 Todo를 정의함.
-TodoInput.tsx에서
type TodoInputProps = {
  onAdd: (text: string) => void;
};
text: string으로 컴포넌트의 props타입을 지정하여 타입 안정성을 높임.
-TodoInput.tsx에서
const [value, setValue] = useState<string>('');
로 useState의 원소 타입을 명시해서 잘못된 값이 컴파일 되는 것을 막음.
-TodoInput.tsx에서
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const text = value.trim();
        if (!text) return;
        onAdd(text);
        setValue('');
    }
로 폼 이벤트를 제네릭 이벤트로 제한함.
-useCallbak과 memo()를 사용해서 불필요한 재렌더링을 방지함.


## ❓ 과제하면서 어려웠던 점
과제를 하면서 어려웠던 부분이 있었나요? 없으면 없다고 작성해주세요.
>뭔가 한 지점이 어려웠다기 보다는 컴포넌트 요소들의 props 같은 데이터 전달이나 요소들을 엮어내는 것과 흐름을 이해하고 구현하는게 어려웠습니다.

## 💬 스터디에서 공유할 내용
스터디에서 다룰만한 중요한 내용, 혹은 다른 사람들에게 도움이 될 수 있는 내용을 적어주세요.
>
-TodoInput.tsx에서
type TodoInputProps = {
  onAdd: (text: string) => void;
};
이 코드는 TodoInputProps 라는 타입별칭을 만들어서 TodoInput 컴포넌트에 전달된 props의 구조를 정의한 코드임.
그 props의 이름이 onAdd 이고 인자는 string 타입으로 받고, 반환값은 없다는 내용임.

-e.preventDefault();의 e는 이벤트 객체, preventDefault()는 브라우저의 새로고침을 막아주는 역할.

-.trim()는 문자열 양 옆의 공백을 지워줌.