import { SignInData, SignUpData } from '@/app/features/auth/types';
import { axiosInstance } from '@/app/lib/axios-client';

export const authApi = {
    signIn: async (data: SignInData): Promise<void> => {
        return axiosInstance.post('/api/auth/signin', data);
    },
    signUp: async (data: SignUpData): Promise<void> => {
        return axiosInstance.post('/api/auth/signup', data);
    },
    logout: async (): Promise<void> => {
        return axiosInstance.post('/api/auth/logout');
    },
};
