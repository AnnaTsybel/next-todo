// api/todos.ts or features/todos/api/todos.ts

import { axiosInstance } from '@/app/lib/axios-client';
import { CreateTodoData, Todo, TodoStatus, UpdateTodoData } from '@/app/features/todos/types';

export const todosApi = {
    getTodos: async (): Promise<Todo[]> => {
        return axiosInstance.get('/api/todos');
    },
    getTodoById: async (id: string): Promise<Todo> => {
        return axiosInstance.get(`/api/todos/${id}`);
    },
    createTodo: async (data: CreateTodoData): Promise<void> => {
        return axiosInstance.post('/api/todos', data);
    },
    updateTodo: async ({ id, ...data }: UpdateTodoData): Promise<void> => {
        return axiosInstance.put(`/api/todos/${id}`, data);
    },
    deleteTodo: async (id: string): Promise<void> => {
        return axiosInstance.delete(`/api/todos/${id}`);
    },
    updateTodoStatus: async (id: string, status: TodoStatus): Promise<Todo[]> => {
        return axiosInstance.patch(`/api/todos/${id}/status`, { status });
    },
};
