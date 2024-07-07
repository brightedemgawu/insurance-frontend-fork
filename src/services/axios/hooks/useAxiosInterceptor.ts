import {useEffect} from "react";
import {AxiosError, AxiosResponse, InternalAxiosRequestConfig} from "axios";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {axiosInstance} from "@/services/axios/axiosInstance";

export const useAxiosInterceptor = () => {
    // Fetch the token refresh function and access token from your application
    const authUser = useSelector((state: RootState) => state.auth.authenticatedUser);
    const token = authUser?.token ?? "";

    // Define request/response and error interceptors
    const reqResInterceptor = (config: InternalAxiosRequestConfig) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    }

    const reqErrInterceptor = async (error: AxiosError) => Promise.reject(error);

    const resResInterceptor = async (response: AxiosResponse) => {
        // Handle successful responses as needed
        return response;
    }

    const resErrInterceptor = async (error: any) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const newAccessToken = "";
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                // Update the instance header
                return axiosInstance(originalRequest);
            } catch (error) {

                // Sign out
                console.error('Token refresh failed', error);
            }

        }
        return Promise.reject(error);
    }

    // Set up the interceptors with useEffect
    useEffect(() => {
        const reqInterceptor = axiosInstance.interceptors.request.use(
            reqResInterceptor,
            reqErrInterceptor,
        );

        const resInterceptor = axiosInstance.interceptors.response.use(
            resResInterceptor,
            resErrInterceptor,
        );

        // Cleanup function
        return () => {

            axiosInstance.interceptors.request.eject(reqInterceptor);

            axiosInstance.interceptors.response.eject(resInterceptor);
        }
    }, [token]);

    return {instance: axiosInstance};
}
