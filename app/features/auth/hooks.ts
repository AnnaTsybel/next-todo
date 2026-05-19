'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { authApi } from '@features/auth/api';
import { handleAuthError } from '@features/auth/errorHandler';

export const useSignIn = () => {
    return useMutation({
        mutationFn: authApi.signIn,
        onSuccess: async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            window.location.href = '/';
        },
        onError: handleAuthError,
    });
};

export const useSignUp = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: authApi.signUp,
        onSuccess: _ => {
            router.push('/auth/signin');
        },
        onError: handleAuthError,
    });
};

export const useLogout = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: authApi.logout,
        onSuccess: () => {
            router.refresh();
            router.push('/auth/signin');
        },
        onError: () => {
            toast.error('Failed to log out. Please try again.');
        },
    });
};
