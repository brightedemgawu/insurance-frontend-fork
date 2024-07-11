export interface UpdateEmployeeDto {
    email: string;
    firstName: string;
    lastName: string;
    otherName?: string;
    dateOfBirth?: string;
    gender?: string;
    maritalStatus?: string;
    nationality?: string;
    phone?: string;
    photo?: string;
    userType: string;
    updatedBy: number;
    accessLevelId: string;
}
