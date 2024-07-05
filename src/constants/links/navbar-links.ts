export type UserMenuNavBarLink = {
    name: string,
    link: string,
    predicate?: (param?: any) => boolean,
}

export const userMenuNavBarLinks: UserMenuNavBarLink[] =
    [
        {name: "Dashboard", link: "/dashboard"},
        {name: "Settings", link: "/dashboard/settings"},
    ]
