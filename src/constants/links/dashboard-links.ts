import {LayoutDashboard, LucideIcon, Settings, Users} from "lucide-react";
import {AuthenticatedUser, UserTypes} from "@/types/authentication";

export type DashboardSideBarLinkItemType = {
    name: string,
    icon?: LucideIcon,
    link: string,
    predicate?: (param?: any) => boolean,
}

export const dashboardSideBarLinkMainItems: DashboardSideBarLinkItemType[] = [
    {
        name: "Dashboard",
        link: "/dashboard",
        icon: LayoutDashboard,
        predicate: (user: AuthenticatedUser | null) => {
            if (!user) {
                return true;
            }

            if (user.userType === UserTypes.Admin) {
                return true;
            }
            return user.accessLevel?.permissions?.view_dashboard;
        }
    },
    {
        name: "Staffs",
        link: "/dashboard/staffs",
        icon: Users,
        predicate: (user: AuthenticatedUser | null) => {

            if (!user) {
                return true;
            }

            if (user.userType === UserTypes.Admin) {
                return true;
            }
            return user.accessLevel?.permissions?.view_users
        }
    },
]

export const dashboardSideBarLinkSettingItems: DashboardSideBarLinkItemType[] = [
    {
        name: "Settings",
        link: "/dashboard/settings",
        icon: Settings,
        predicate: (user: AuthenticatedUser | null) => {

            if (!user) {
                return true;
            }

            if (user.userType === UserTypes.Admin) {
                return true;
            }
            return user.accessLevel?.permissions?.view_settings
        }
    },
]

export  type SettingsLayoutLink = {
    name: string,
    link: string,
    predicate?: (param?: any) => boolean,
}

export const SettingsLayoutLinks: SettingsLayoutLink[] = [
    {
        name: "Access Level",
        link: "/dashboard/settings/access-level",
        predicate: (user: AuthenticatedUser | null) => {

            if (!user) {
                return true;
            }

            if (user.userType === UserTypes.Admin) {
                return true;
            }
            return user.accessLevel?.permissions?.view_access_levels
        }
    },

]
