'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { usersApi } from '@features/users/api';

export function useProfile() {
    return useQuery({
        queryKey: ['USER_PROFILE'],
        queryFn: usersApi.getProfile,
    });
}

export function useUpdateProfile() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: usersApi.updateProfile,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['USER_PROFILE'] });
        },
    });
}

export function useUploadAvatar() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: usersApi.uploadAvatar,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['USER_PROFILE'] });
        },
    });
}

export function useDeleteAvatar() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: usersApi.deleteAvatar,
        onSuccess: user => {
            queryClient.setQueryData(['USER_PROFILE'], user);
        },
    });
}
