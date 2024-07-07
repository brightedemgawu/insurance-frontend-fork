import useApiService from "@/services/axios/hooks/useApiService";
import {useCallback} from "react";
import {SendOtpCodeDto} from "@/services/authentication/dtos/request/SendOtpCodeDto";
import ApiResponse from "@/types/ApiResponse";
import {SuccessfulLoginDto} from "@/services/authentication/dtos/response/SuccessfulLoginDto";
import {VerifyOtpCodeDto} from "@/services/authentication/dtos/request/VerifyOtpCodeDto";

const useAuthenticationService = () => {
    const apiService = useApiService();

    const sendOtpCode = useCallback(async (data: SendOtpCodeDto): Promise<ApiResponse<string>> => {
        const response = await apiService.post<ApiResponse<string>>('/user/login', data);
        return response.data;
    }, [apiService]);

    const verifyOtpCode = useCallback(async (data: VerifyOtpCodeDto): Promise<ApiResponse<SuccessfulLoginDto>> => {
        const response = await apiService.post<ApiResponse<SuccessfulLoginDto>>('/user/verify-otp', data);
        return response.data;
    }, [apiService]);

    return {
        sendOtpCode,
        verifyOtpCode,
    }
}


export default useAuthenticationService;
