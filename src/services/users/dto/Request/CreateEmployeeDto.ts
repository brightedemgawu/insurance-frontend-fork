export interface CreateEmployeeDto {
    email: string;
    firstName: string;
    lastName: string;
    otherName?: string;
    userType: string;
    createdBy: number;
    positionId: string,
    accessLevelId: string;
}
