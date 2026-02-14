import { UpdateUserData, User } from '@/app/features/users/types';
import { axiosInstance } from '@/app/lib/axios-client';

export const usersApi = {
    getProfile: async (): Promise<User> => {
        return await axiosInstance.get('/api/users');
    },
    updateProfile: async (data: UpdateUserData): Promise<void> => {
        return await axiosInstance.patch('/api/users', data);
    },
    uploadAvatar: (file: File) => {
        const formData = new FormData();
        formData.append('avatar', file);

        return axiosInstance.post('/api/users/avatar', formData);
    },
    deleteAvatar: () => {
        return axiosInstance.delete('/api/users/avatar');
    },
};
