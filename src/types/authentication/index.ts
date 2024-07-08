export type AuthenticatedUser = {
    id: number;
    name: string;
    email: string;
    imageUrl?: string;
    userType: UserTypes;
    accessLevel: AccessLevel
    token: string
}

export enum UserTypes {
    Admin = "admin",
    Employee = "employee",
    Client = "client"
}

export interface AccessLevelPermissions {
    view_users: boolean;
    manage_users: boolean;
    view_dashboard: boolean;
    view_access_levels: boolean;
    view_settings: boolean;
    manage_access_levels: boolean;
}

interface AccessLevel {
    id: number;
    name: string;
    permissions: AccessLevelPermissions;
}

export type DecodedRefreshToken = {
    id: number;
    name: string;
    email: string;
    userType: UserTypes;
    accessLevel: AccessLevel
}
