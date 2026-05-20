import { axiosInstance } from '@lib/axios-client';
import {
    CreateTodoData,
    Todo,
    TodosResponse,
    UpdateTodoData,
    UpdateTodoStatusVariables,
} from '@features/todos/types';

export const todosApi = {
    getTodos: async (typeId?: number): Promise<TodosResponse> => {
        return axiosInstance.get('/api/todos', {
            params: typeId ? { type_id: typeId } : undefined,
        });
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
    updateTodoStatus: async ({ id, status }: UpdateTodoStatusVariables): Promise<void> => {
        return axiosInstance.patch(`/api/todos/${id}`, { status });
    },
    getCalendarTodos: async ({
        month,
        year,
    }: {
        month: number;
        year: number;
    }): Promise<{ todos: Todo[]; length: number }> => {
        return axiosInstance.get(`/api/todos/calendar?month=${month}&year=${year}`);
    },
};
