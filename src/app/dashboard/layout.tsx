import {ReactNode} from "react";
import DashboardSideBar from "@/app/dashboard/_components/DashboardSideBar/DashboardSideBar";
import DashboardNavBar from "@/app/dashboard/_components/DashboardNavBar/DashboardNavBar";

export default function DashboardLayout({children}: { children: ReactNode }) {
    return (
        <div
            className={"w-full  flex gap-[2px] h-screen max-h-screen relative"}
        >
            <DashboardSideBar/>
            <div
                className={"w-full h-screen max-h-screen overflow-y-scroll custom-scrollbar"}
            >
                <DashboardNavBar/>
                <div className="w-full  p-2 md:p-4 h-full">
                    {children}
                </div>
            </div>
        </div>
    )
}
