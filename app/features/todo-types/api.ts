import { axiosInstance } from '@lib/axios-client';

import { CreateTodoTypeData, TodoType, UpdateTodoTypeData } from './types';

export const todosApi = {
    getTodoTypes: async (): Promise<TodoType[]> => {
        return axiosInstance.get('/api/todos-types');
    },

    createTodoType: async (data: CreateTodoTypeData): Promise<TodoType> => {
        return axiosInstance.post('/api/todos-types', data);
    },

    updateTodoType: async ({ id, ...data }: UpdateTodoTypeData): Promise<TodoType> => {
        return axiosInstance.put(`/api/todos-types/${id}`, data);
    },

    deleteTodoType: async (id: number): Promise<void> => {
        return axiosInstance.delete(`/api/todos-types/${id}`);
    },
};
