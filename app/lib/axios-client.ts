import axios, { AxiosError, AxiosInstance } from 'axios';

const errorHandler = <T>(error: AxiosError<T>): Promise<never> => Promise.reject(error);

export const axiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    withCredentials: true,
});

axiosInstance.interceptors.request.use(request => request, errorHandler);

axiosInstance.interceptors.response.use(
    res => res.data.data,
    err => {
        return Promise.reject(err);
    },
);
