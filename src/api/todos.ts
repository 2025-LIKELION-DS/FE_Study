// src/api/todos.ts
import axios from 'axios';
import type { Todo } from '../types';

const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
});


export const getTodos = async (): Promise<Todo[]> => {
  const response = await apiClient.get<Todo[]>('/todos');
 
  return response.data.slice(0, 10);
};

export const addTodo = async (newTodo: Omit<Todo, 'id'>): Promise<Todo> => {
  const response = await apiClient.post<Todo>('/todos', newTodo);
  return response.data;
};


export const updateTodo = async (updatedTodo: Todo): Promise<Todo> => {
  const response = await apiClient.patch<Todo>(`/todos/${updatedTodo.id}`, updatedTodo);
  return response.data;
};


export const deleteTodo = async (id: number): Promise<void> => {
  await apiClient.delete(`/todos/${id}`);
};