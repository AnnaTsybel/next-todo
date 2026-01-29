import axios, { AxiosError, AxiosInstance, HttpStatusCode } from 'axios';
import Cookies from 'js-cookie';

const errorHandler = <T>(error: AxiosError<T>): Promise<never> => Promise.reject(error);

export const axiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    withCredentials: true,
});

axiosInstance.interceptors.request.use(request => request, errorHandler);

axiosInstance.interceptors.response.use(
    result => result.data.data,
    error => {
        if (error.response?.status === HttpStatusCode.Unauthorized) {
            //add notification for Unauthorized
        }

        return Promise.reject(error);
    },
);
