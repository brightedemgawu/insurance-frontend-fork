import {AccessLevelPermissions} from "@/types/authentication/access-level-permissions";

export interface CreateAccessLevelDto {
    name?: string,
    description?: string,
    createdBy?: number,
    permissions?: AccessLevelPermissions,
    assignedUsers?: string[]
}
