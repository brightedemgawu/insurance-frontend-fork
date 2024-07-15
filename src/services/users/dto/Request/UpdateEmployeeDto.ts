export interface UpdateEmployeeDto {
    email: string;
    firstName: string;
    lastName: string;
    otherName?: string;
    dateOfBirth?: Date;
    gender?: string;
    maritalStatus?: string;
    nationality?: string;
    phone?: string;
    address?: string;
    positionId?: string,
    accessLevelId?: string;
}
