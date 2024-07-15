import useApiService from "@/services/axios/hooks/useApiService";
import {useCallback} from "react";
import ApiResponse from "@/types/ApiResponse";
import {ReadAccessLevelDto} from "@/services/access-levels/dtos/response/ReadAccessLevelDto";
import {CreateAccessLevelDto} from "@/services/access-levels/dtos/request/CreateAccessLevelDto";
import {UpdateAccessLevelDto} from "@/services/access-levels/dtos/request/UpdateAccessLevelDto";

const useAccessLevelService = () => {

    const apiService = useApiService();

    const getAccessLevels = useCallback(async (): Promise<ApiResponse<ReadAccessLevelDto[]>> => {
        const response = await apiService.get<ApiResponse<ReadAccessLevelDto[]>>('/access-level/list');
        return response.data;
    }, [apiService]);


    const getAccessLevel = useCallback(async (id: number): Promise<ApiResponse<ReadAccessLevelDto>> => {
        const response = await apiService.get<ApiResponse<ReadAccessLevelDto>>(`/access-level/get?id=${id}`);
        return response.data;
    }, [apiService]);

    const createAccessLevel = useCallback(async (data: CreateAccessLevelDto): Promise<ApiResponse<string>> => {
        const response = await apiService.post<ApiResponse<string>>("/access-level/create", data);
        return response.data;
    }, [apiService]);

    const updateAccessLevel = useCallback(async (data: UpdateAccessLevelDto): Promise<ApiResponse<string>> => {
        const response = await apiService.put<ApiResponse<string>>("/access-level/update", data);
        return response.data;
    }, [apiService]);

    const deleteAccessLevel = useCallback(async (id: number): Promise<ApiResponse<string>> => {
        const response = await apiService.del<ApiResponse<string>>(`/access-level/delete?id=${id}`);
        return response.data;
    }, [apiService]);

    return {
        getAccessLevels,
        createAccessLevel,
        deleteAccessLevel,
        updateAccessLevel,
        getAccessLevel,
    }
}

export default useAccessLevelService;
