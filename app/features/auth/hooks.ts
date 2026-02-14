'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { authApi } from '@/app/features/auth/api';

export const useSignIn = () => {
    return useMutation({
        mutationFn: authApi.signIn,
        onSuccess: async () => {
            await new Promise(resolve => setTimeout(resolve, 1000));
            window.location.href = '/';
        },
        onError: error => {
            toast.error('Something went wrong in signing in!');
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
    });
};
