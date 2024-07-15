import {House, LucideIcon, Settings, UserRound, Users} from "lucide-react";
import {
    AccessLevelPermissions,
    VIEW_ACCESS_LEVELS_PERMISSION,
    VIEW_SETTINGS_PERMISSION,
    VIEW_STAFF_POSITIONS_PERMISSION,
    VIEW_STAFFS_PERMISSION
} from "@/types/authentication/access-level-permissions";

export type DashboardSideBarLinkItemType = {
    name: string,
    icon?: LucideIcon,
    link: string,
    permissions?: (keyof AccessLevelPermissions)[],
    predicate?: (param?: any) => boolean,
}

export const dashboardSideBarLinkMainItems: DashboardSideBarLinkItemType[] = [
    {
        name: "Home",
        link: "/dashboard",
        icon: House,
    },
    {
        name: "Staffs",
        link: "/dashboard/staffs",
        icon: Users,
        permissions: [VIEW_STAFFS_PERMISSION]
    },
]

export const dashboardSideBarLinkSettingItems: DashboardSideBarLinkItemType[] = [
    {
        name: "Settings",
        link: "/dashboard/settings",
        icon: Settings,
        permissions: [VIEW_SETTINGS_PERMISSION]
    },
    {
        name: "Profile",
        link: "/dashboard/profile",
        icon: UserRound 
    },
]

export  type SettingsLayoutLink = {
    name: string,
    link: string,
    permissions?: (keyof AccessLevelPermissions)[],
    predicate?: (param?: any) => boolean,
}

export const SettingsLayoutLinks: SettingsLayoutLink[] = [
    {
        name: "Access Level",
        link: "/dashboard/settings/access-level",
        permissions: [VIEW_ACCESS_LEVELS_PERMISSION]
    },
    {
        name: "Staff Positions",
        link: "/dashboard/settings/staff-positions",
        permissions: [VIEW_STAFF_POSITIONS_PERMISSION]
    },
]
