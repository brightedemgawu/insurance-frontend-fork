import useApiService from "@/services/axios/hooks/useApiService";
import {useCallback} from "react";
import ApiResponse from "@/types/ApiResponse";
import {StaffPositionsReadDto} from "@/services/staff-positions/dto/response/StaffPositionsReadDto";
import {CreateStaffPositionDto} from "@/services/staff-positions/dto/request/CreateStaffPositionDto";
import {UpdateStaffPositionDto} from "@/services/staff-positions/dto/request/UpdateStaffPositionDto";

const useStaffPositionsService = () => {

    const apiService = useApiService();

    const getStaffPositions = useCallback(async (): Promise<ApiResponse<StaffPositionsReadDto[]>> => {
        const response = await apiService.get<ApiResponse<StaffPositionsReadDto[]>>('/position/list');
        return response.data;
    }, [apiService]);

    const createStaffPositions = useCallback(async (data: CreateStaffPositionDto): Promise<ApiResponse<string>> => {
        const response = await apiService.post<ApiResponse<string>>("/position/create", data);
        return response.data;
    }, [apiService]);

    const updateStaffPositions = useCallback(async (data: UpdateStaffPositionDto): Promise<ApiResponse<string>> => {
        const response = await apiService.put<ApiResponse<string>>("/position/update", data);
        return response.data;
    }, [apiService]);
    const deleteStaffPosition = useCallback(async (id: number): Promise<ApiResponse<string>> => {
        const response = await apiService.del<ApiResponse<string>>(`/position/delete?id=${id}`);
        return response.data;
    }, [apiService]);

    return {
        getStaffPositions,
        createStaffPositions,
        updateStaffPositions,
        deleteStaffPosition
    }
}


export default useStaffPositionsService;
