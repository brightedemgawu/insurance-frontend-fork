import {AccessLevelPermissions} from "@/types/authentication";

export interface CreateAccessLevelDto {
    name?: string,
    description?: string,
    createdBy?: number,
    permissions?: AccessLevelPermissions,
    assignedUsers?: string[]
}
