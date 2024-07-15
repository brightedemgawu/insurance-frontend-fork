import {AccessLevelPermissions} from "@/types/authentication/access-level-permissions";

export interface ReadAccessLevelDto {
    id: number;
    name: string;
    description: string;
    permissions: AccessLevelPermissions;
    users: {
        id: number,
        name: string,
        email: string,
        employeeInfo?: { photo: string, } | null
    }[];
}
