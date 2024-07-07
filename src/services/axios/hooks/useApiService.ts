import {AxiosRequestConfig, AxiosResponse} from 'axios';
import qs from 'qs';
import {useAxiosInterceptor} from "@/services/axios/hooks/useAxiosInterceptor";

const useApiService = () => {
    const {instance} = useAxiosInterceptor();

    const get = async <T>(url: string): Promise<AxiosResponse<T>> => {
        return instance.get<T>(url);
    };

    const del = async <T>(url: string): Promise<AxiosResponse<T>> => {
        return instance.delete<T>(url);
    };

    const post = async <T>(url: string, data: any, contentType: string = 'application/json'): Promise<AxiosResponse<T>> => {
        const config: AxiosRequestConfig = {
            headers: {
                'Content-Type': contentType,
            },
        };

        if (contentType === 'application/x-www-form-urlencoded') {
            data = qs.stringify(data);
        }

        return instance.post<T>(url, data, config);
    };

    const put = async <T>(url: string, data: any, contentType: string = 'application/json'): Promise<AxiosResponse<T>> => {
        const config: AxiosRequestConfig = {
            headers: {
                'Content-Type': contentType,
            },
        };

        if (contentType === 'application/x-www-form-urlencoded') {
            data = qs.stringify(data);
        }

        return instance.put<T>(url, data, config);
    };

    const patch = async <T>(url: string, data?: any, contentType: string = 'application/json'): Promise<AxiosResponse<T>> => {
        const config: AxiosRequestConfig = {
            headers: {
                'Content-Type': contentType,
            },
        };

        if (contentType === 'application/x-www-form-urlencoded') {
            data = qs.stringify(data);
        }

        return instance.patch<T>(url, data, config);
    };

    return {
        get,
        del,
        post,
        put,
        patch,
    };
};

export default useApiService;
