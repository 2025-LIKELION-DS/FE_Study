export type TodoApi = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export type Todo = {
  id: number;
  text: string;
  isCompleted: boolean;
};

export const toUITodo = (t: TodoApi): Todo => ({
  id: t.id,
  text: t.title,
  isCompleted: t.completed,
});

export const toApiPayload = (text: string): Partial<TodoApi> => ({
  userId: 1,
  title: text,
  completed: false,
});
