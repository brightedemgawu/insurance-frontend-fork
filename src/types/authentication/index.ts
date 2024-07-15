import {AccessLevelPermissions} from "@/types/authentication/access-level-permissions";

export type AuthenticatedUser = {
    id: number;
    name: string;
    email: string;
    photo: string | null;
    position: string;
    onboarding: boolean;
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
    accessLevel: AccessLevel;
    photo: string | null;
    position: string;
    onboarding: boolean;
}
