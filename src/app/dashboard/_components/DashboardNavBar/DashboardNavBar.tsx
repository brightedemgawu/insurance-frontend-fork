import DashboardNavBarMobileSheet from "@/app/dashboard/_components/DashboardNavBar/DashboardNavBarMobileSheet";
import NavBarUserMenu from "@/app/dashboard/_components/DashboardSideBar/NavBarUserMenu";

export default function DashboardNavBar() {
    return (
        <nav
            className={"z-10 px-4 drop-shadow-sm bg-gray-white sticky top-0 w-full flex items-center justify-between h-[60px]"}
        >
            <div className="md:hidden">
                <DashboardNavBarMobileSheet/>
            </div>
            <div
                className={"hidden md:inline-block"}
            ></div>
            <NavBarUserMenu/>
        </nav>
    )
}
