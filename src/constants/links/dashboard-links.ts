import {LayoutDashboard, LucideIcon, Settings, Users} from "lucide-react";
import {AccessLevelPermissions} from "@/types/authentication/access-level-permissions";

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
        icon: LayoutDashboard,
        permissions: ["view_dashboard"]
    },
    {
        name: "Staffs",
        link: "/dashboard/staffs",
        icon: Users,
        permissions: ["view_users"]
    },
]

export const dashboardSideBarLinkSettingItems: DashboardSideBarLinkItemType[] = [
    {
        name: "Settings",
        link: "/dashboard/settings/access-level",
        icon: Settings,
        permissions: ["view_settings"]
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
        permissions: ["view_access_levels"]
    },
]
