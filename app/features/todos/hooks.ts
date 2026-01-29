'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { todosApi } from './api';

export const useGetTodos = () => {
    return useQuery({
        queryKey: ['GET_TODOS'],
        queryFn: todosApi.getTodos,
        staleTime: 30000,
    });
};

export const useGetTodoById = (id: string) => {
    return useQuery({
        queryKey: ['GET_TODO_BY_ID'],
        queryFn: () => todosApi.getTodoById(id),
        enabled: !!id,
    });
};

export const useCreateTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: todosApi.createTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['GET_TODOS'] });
        },
        onError: error => {
            console.error('Create todo error:', error);
        },
    });
};

export const useUpdateTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: todosApi.updateTodo,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['GET_TODOS'] });
            queryClient.invalidateQueries({ queryKey: ['GET_TODO_BY_ID', variables.id] });
        },
        onError: error => {
            console.error('Update todo error:', error);
        },
    });
};

export const useDeleteTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: todosApi.deleteTodo,
        onSuccess: (_, todoId) => {
            queryClient.invalidateQueries({ queryKey: ['GET_TODOS'] });
            queryClient.removeQueries({ queryKey: ['GET_TODO_BY_ID', todoId] });
        },
        onError: error => {
            console.error('Delete todo error:', error);
        },
    });
};
