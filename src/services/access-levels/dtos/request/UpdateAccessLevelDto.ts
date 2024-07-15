import {AccessLevelPermissions} from "@/types/authentication/access-level-permissions";

export interface UpdateAccessLevelDto {
    id: number,
    name: string,
    description?: string,
    updatedBy: number,
    permissions?: AccessLevelPermissions,
    assignedUsers?: string[]
}
