import {EmployeeReadInfoDto} from "@/services/users/dto/Response/EmployeeReadInfoDto";

export interface EmployeeReadDto {
    id: number;
    name: string;
    email: string;
    createdAt: string;
    active: boolean;
    positionId: string,
    photo: string | null;
    createdBy: number;
    updatedAt: string | null;
    updatedBy: number | null;
    userType: string;
    accessLevelId: number | null;
    employeeInfo: EmployeeReadInfoDto;
}
