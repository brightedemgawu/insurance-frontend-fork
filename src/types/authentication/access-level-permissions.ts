export const MANAGE_ACCESS_LEVELS_PERMISSION = "manage_access_levels"
export const VIEW_ACCESS_LEVELS_PERMISSION = "view_access_levels"
export const VIEW_SETTINGS_PERMISSION = "view_settings"
export const VIEW_STAFF_POSITIONS_PERMISSION = "view_staff_positions"
export const MANAGE_STAFF_POSITIONS_PERMISSION = "manage_staff_positions"
export const DashboardSettingsPermissions: string[] = [
    VIEW_SETTINGS_PERMISSION,
    VIEW_ACCESS_LEVELS_PERMISSION,
    MANAGE_ACCESS_LEVELS_PERMISSION,
    VIEW_STAFF_POSITIONS_PERMISSION,
    MANAGE_STAFF_POSITIONS_PERMISSION
] as const;


export const VIEW_STAFFS_PERMISSION = "view_staffs"
export const MANAGE_STAFFS_PERMISSION = "manage_staffs"
export const StaffPermissions: string[] = [
    VIEW_STAFFS_PERMISSION,
    MANAGE_STAFFS_PERMISSION,
] as const;


export type AccessLevelPermissions = {
    [VIEW_SETTINGS_PERMISSION]: boolean,
    [VIEW_ACCESS_LEVELS_PERMISSION]: boolean,
    [MANAGE_ACCESS_LEVELS_PERMISSION]: boolean,
    [VIEW_STAFF_POSITIONS_PERMISSION]: boolean,
    [MANAGE_STAFF_POSITIONS_PERMISSION]: boolean,

    [VIEW_STAFFS_PERMISSION]: boolean,
    [MANAGE_STAFFS_PERMISSION]: boolean,


};

// Utility function to initialize permissions with all false values
export const initializePermissions = (): AccessLevelPermissions => {
    return {
        view_staff_positions: false,
        manage_staff_positions: false,
        view_settings: false,
        view_access_levels: false,
        manage_access_levels: false,
        view_staffs: false,
        manage_staffs: false,
    };
};
