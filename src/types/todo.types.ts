export type Todo = { id: number; todo: string; done: boolean };

export type Todos = Todo[];

export type AddTodo = (todo: string) => void;

export type CompleteTodo = (id: number) => void;

export type DeleteTodo = (id: number) => void;
