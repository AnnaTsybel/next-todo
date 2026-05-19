'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { todosApi } from './api';
import { handleTodoError } from './errorHandler';

export const useGetTodos = () => {
    const query = useQuery({
        queryKey: ['GET_TODOS'],
        queryFn: todosApi.getTodos,
        staleTime: 30_000,
    });

    useEffect(() => {
        if (query.error) {
            handleTodoError(query.error);
        }
    }, [query.error]);

    return query;
};

export const useGetTodoById = (id: string) => {
    const query = useQuery({
        queryKey: ['GET_TODO_BY_ID', id],
        queryFn: () => todosApi.getTodoById(id),
        enabled: !!id,
    });

    useEffect(() => {
        if (query.error) {
            handleTodoError(query.error);
        }
    }, [query.error]);

    return query;
};

export const useCreateTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: todosApi.createTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['GET_TODOS'] });
        },
        onError: handleTodoError,
    });
};

export const useUpdateTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: todosApi.updateTodo,
        onSuccess: (_, variables) => {
            const now = new Date();
            const month = now.getMonth() + 1;
            const year = now.getFullYear();

            queryClient.invalidateQueries({ queryKey: ['GET_TODOS'] });
            queryClient.invalidateQueries({ queryKey: ['GET_TODO_BY_ID', variables.id] });
            queryClient.invalidateQueries({ queryKey: ['GET_CALENDAR_TODOS', month, year] });
        },
        onError: handleTodoError,
    });
};

export const useUpdateTodoStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: todosApi.updateTodoStatus,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['GET_TODOS'] });
            queryClient.invalidateQueries({ queryKey: ['GET_TODO_BY_ID', variables.id] });
        },
        onError: handleTodoError,
    });
};

export const useDeleteTodo = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: todosApi.deleteTodo,
        onSuccess: (_, todoId) => {
            const now = new Date();
            const month = now.getMonth() + 1;
            const year = now.getFullYear();

            queryClient.invalidateQueries({ queryKey: ['GET_TODOS'] });
            queryClient.removeQueries({ queryKey: ['GET_TODO_BY_ID', todoId] });
            queryClient.invalidateQueries({ queryKey: ['GET_CALENDAR_TODOS', month, year] });
        },
        onError: handleTodoError,
    });
};

export const useGetCalendarTodos = (month: number, year: number) => {
    const query = useQuery({
        queryKey: ['GET_CALENDAR_TODOS', month, year],
        queryFn: () => todosApi.getCalendarTodos({ month, year }),
        staleTime: 30_000,
    });

    useEffect(() => {
        if (query.error) {
            handleTodoError(query.error);
        }
    }, [query.error]);

    return query;
};
