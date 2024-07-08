import useApiService from "@/services/axios/hooks/useApiService";
import {useCallback} from "react";
import ApiResponse from "@/types/ApiResponse";
import {EmployeeReadDto} from "@/services/users/dto/Response/EmployeeReadDto";
import {CreateEmployeeDto} from "@/services/users/dto/Request/CreateEmployeeDto";

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

    return {
        getEmployees,
        createEmployee,
    }
}


export default useUsersService;
