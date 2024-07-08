import useApiService from "@/services/axios/hooks/useApiService";
import {useCallback} from "react";
import ApiResponse from "@/types/ApiResponse";
import {ReadAccessLevelDto} from "@/services/access-levels/dtos/response/ReadAccessLevelDto";
import {CreateAccessLevelDto} from "@/services/access-levels/dtos/request/CreateAccessLevelDto";

const useAccessLevelService = () => {

    const apiService = useApiService();
    const getAccessLevels = useCallback(async (): Promise<ApiResponse<ReadAccessLevelDto[]>> => {
        const response = await apiService.get<ApiResponse<ReadAccessLevelDto[]>>('/access-level/list');
        return response.data;
    }, [apiService]);

    const createAccessLevel = useCallback(async (data: CreateAccessLevelDto): Promise<ApiResponse<string>> => {
        const response = await apiService.post<ApiResponse<string>>("/access-level/create", data);
        return response.data;
    }, [apiService]);
    return {
        getAccessLevels,
        createAccessLevel
    }
}

export default useAccessLevelService;
