'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { todosApi } from './api';
import { handleTodoError } from './errorHandler';
import { TodoType } from './types';

export const useGetTodoTypes = () => {
    const query = useQuery({
        queryKey: ['GET_TODO_TYPES'],
        queryFn: todosApi.getTodoTypes,
        staleTime: 60_000,
    });

    useEffect(() => {
        if (query.error) {
            handleTodoError(query.error);
        }
    }, [query.error]);

    return query;
};

export const useCreateTodoType = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: todosApi.createTodoType,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['GET_TODO_TYPES'],
            });
        },
        onError: handleTodoError,
    });
};

export const useUpdateTodoType = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: todosApi.updateTodoType,

        onSuccess: updatedType => {
            queryClient.setQueryData(['GET_TODO_TYPES'], (old: TodoType[] | undefined) => {
                if (!old) return [];

                return old.map(type => (type.id === updatedType.id ? updatedType : type));
            });
        },

        onError: handleTodoError,
    });
};

export const useDeleteTodoType = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: todosApi.deleteTodoType,

        onSuccess: (_, deletedId) => {
            queryClient.setQueryData(['GET_TODO_TYPES'], (old: TodoType[] | undefined) => {
                if (!old) return [];

                return old.filter(type => type.id !== deletedId);
            });

            queryClient.invalidateQueries({ queryKey: ['GET_TODOS'] });
            queryClient.invalidateQueries({ queryKey: ['GET_CALENDAR_TODOS'] });
        },

        onError: handleTodoError,
    });
};
