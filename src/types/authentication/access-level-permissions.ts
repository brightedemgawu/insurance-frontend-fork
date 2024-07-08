export const DashboardSettingsPermissions: string[] = [
    "view_settings",
    "view_access_levels",
    "manage_access_levels"
] as const;


export const StaffPermissions: string[] = [
    "view_users",
    "manage_users"
] as const;

const OtherPermissions: string[] = [
    "view_dashboard"
]

const combinedPermissions = [
    ...DashboardSettingsPermissions,
    ...StaffPermissions,
    ...OtherPermissions,
] as const;

export type AccessLevelPermissions = {
    view_settings: boolean,
    view_access_levels: boolean,
    manage_access_levels: boolean

    view_users: boolean,
    manage_users: boolean,


    view_dashboard: boolean
};
