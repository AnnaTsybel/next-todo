'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { authApi } from '@/app/features/auth/api';

export const useSignIn = () => {
    return useMutation({
        mutationFn: authApi.signIn,
        onSuccess: async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            window.location.href = '/';
        },
        onError: error => {
            console.error('Sign in error:', error);
        },
    });
};

export const useSignUp = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: authApi.signUp,
        onSuccess: _ => {
            router.push('/auth/signin');
        },
        onError: error => {
            console.error('Sign up error:', error);
        },
    });
};

export const useLogout = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: authApi.logout,
        onSuccess: () => {
            console.log('logged out');
            router.refresh();
            router.push('/auth/signin');
        },
        onError: error => {
            console.error('Logout error:', error);
        },
    });
};
