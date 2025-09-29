export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export type Todos = Todo[];

export type AddTodo = (todo: string) => void;

export type CompleteTodo = (id: number) => void;

export type DeleteTodo = (id: number) => void;
