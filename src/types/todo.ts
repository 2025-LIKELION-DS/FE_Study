export interface Todo {
    userId?: number;   // JSONPlaceholder 기본 스펙에 있음
    id: number;        // Todo 고유 ID
    title: string;     // 할 일 제목
    completed: boolean; // 완료 여부
}  
