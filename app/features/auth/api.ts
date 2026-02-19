import { axiosInstance } from '@lib/axios-client';
import { SignInData, SignUpData } from '@features/auth/types';

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
