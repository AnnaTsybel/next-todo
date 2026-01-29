import { axiosInstance } from '@/app/lib/axios-client';
import { SignInData, SignUpData } from '@/app/features/auth/types';

export const authApi = {
    signIn: async (data: SignInData): Promise<void> => {
        axiosInstance.post('/api/auth/signin', data);
    },
    signUp: async (data: SignUpData): Promise<void> => {
        axiosInstance.post('/api/auth/signup', data);
    },
    logout: async (): Promise<void> => {
        axiosInstance.post('/api/auth/logout');
    },
};
