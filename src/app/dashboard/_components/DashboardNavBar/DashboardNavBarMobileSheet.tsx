"use client"

import AppLogo from "@/components/constants/AppLogo/AppLogo";
import {AlignJustify} from "lucide-react";
import DashboardSideBarLinkMenu from "@/app/dashboard/_components/DashboardSideBar/DashboardSideBarLinkMenu";
import {cn} from "@/lib/utils";
import {dashboardSideBarLinkMainItems, dashboardSideBarLinkSettingItems} from "@/constants/links/dashboard-links";
import {Separator} from "@/components/ui/separator";
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";

export default function DashboardNavBarMobileSheet() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <AlignJustify/>
            </SheetTrigger>
            <SheetContent
                closeIconClassName="right-[-65px] opacity-100 bg-gray-white drop-shadow-2xl rounded-[50%] p-[.7em] "
                className="bg-gray-white p-0"
                side={"left"}
            >
                <div
                    className="relative w-full h-full flex flex-col items-center justify-between"
                >
                    <div
                        className="w-full"
                    >
                        <div
                            className="relative  bg-[#F7F9FA] w-full flex pl-6 items-center h-[70px] border-b-[1px] border-gray-border "
                        >
                            <AppLogo
                            />
                        </div>

                        <div className="w-full px-4 mt-8">
                            <p
                                className={cn(
                                    "my-4 font-normal text-[.7rem] text-gray-text ",
                                )}
                            >MAIN</p>

                            <DashboardSideBarLinkMenu links={dashboardSideBarLinkMainItems} smallBar={false}/>

                            <Separator className={"my-4"}/>

                            <DashboardSideBarLinkMenu links={dashboardSideBarLinkSettingItems} smallBar={false}/>
                        </div>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    )
}
