import useApiService from "@/services/axios/hooks/useApiService";
import {useCallback} from "react";
import ApiResponse from "@/types/ApiResponse";
import {EmployeeReadDto} from "@/services/users/dto/Response/EmployeeReadDto";
import {CreateEmployeeDto} from "@/services/users/dto/Request/CreateEmployeeDto";
import {UpdateEmployeeDto} from "@/services/users/dto/Request/UpdateEmployeeDto";
import {SuccessfulLoginDto} from "@/services/authentication/dtos/response/SuccessfulLoginDto";

const useUsersService = () => {
    const apiService = useApiService();

    const getEmployees = useCallback(async (): Promise<ApiResponse<EmployeeReadDto[]>> => {
        const response = await apiService.get<ApiResponse<EmployeeReadDto[]>>('/user/list-users');
        return response.data;
    }, [apiService]);


    const createEmployee = useCallback(async (data: CreateEmployeeDto): Promise<ApiResponse<CreateEmployeeDto>> => {
        const response = await apiService.post<ApiResponse<CreateEmployeeDto>>('/user/create-user', data);
        return response.data;
    }, [apiService]);

    const updatedEmployee = useCallback(async (data: UpdateEmployeeDto): Promise<ApiResponse<SuccessfulLoginDto>> => {
        const response = await apiService.put<ApiResponse<SuccessfulLoginDto>>('/user/update-user', data);
        return response.data;
    }, [apiService]);

    const changeUserStatus = useCallback(async (email: string): Promise<ApiResponse<string>> => {
        const response = await apiService.put<ApiResponse<string>>(`/user/change-status?email=${email}`, {});
        return response.data;
    }, [apiService]);

    const getEmployee = useCallback(async (email: string): Promise<ApiResponse<EmployeeReadDto>> => {
        const response = await apiService.get<ApiResponse<EmployeeReadDto>>(`/user/get-user?email=${email}`);
        return response.data;
    }, [apiService]);

    const uploadProfilePhoto = useCallback(async (email: string, data: FormData): Promise<ApiResponse<SuccessfulLoginDto>> => {
        const response = await apiService.post<ApiResponse<SuccessfulLoginDto>>(`/user/upload-photo?email=${email}`, data, "multipart/form-data");
        return response.data;
    }, [apiService]);
    return {
        getEmployees,
        createEmployee,
        updatedEmployee,
        changeUserStatus,
        getEmployee,
        uploadProfilePhoto
    }
}


export default useUsersService;
