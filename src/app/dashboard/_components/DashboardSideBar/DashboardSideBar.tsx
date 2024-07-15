"use client"

import {cn} from "@/lib/utils";
import AppLogo from "@/components/constants/AppLogo/AppLogo";
import {PanelLeftClose, PanelRightClose} from "lucide-react";
import AppButton from "@/components/Button/AppButton";
import {useState} from "react";
import UserAvatarWithDetails from "@/components/Auth/UserAvatarWithDetails";
import SignOutActionButton from "@/components/Auth/SignOutActionButton";
import DashboardSideBarLinkMenu from "@/app/dashboard/_components/DashboardSideBar/DashboardSideBarLinkMenu";
import {dashboardSideBarLinkMainItems, dashboardSideBarLinkSettingItems} from "@/constants/links/dashboard-links";
import {Separator} from "@/components/ui/separator";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";

export default function DashboardSideBar() {
    const [smallBar, setSmallBar] = useState<boolean>(false)
    const user = useSelector((state: RootState) => state.auth.authenticatedUser);


    return (
        <aside
            className={cn(
                [
                    "hidden sticky w-[300px] width-transition z-10 left-0 top-0",
                    "h-screen  overflow-y-scroll no-scrollbar max-h-screen bg-gray-white",
                    "md:flex flex-col"
                ],
                {"w-[100px]": smallBar}
            )}
        >
            <div
                className={
                    cn("h-[60px] bg-primary-50/50 relative flex items-center justify-between px-4 w-full border-b-[1px] border-gray-border ",
                        {"justify-center": smallBar})
                }
            >
                <AppLogo
                    iconOnly={smallBar}
                />
                <AppButton
                    className={cn(" border-0 rounded-full  hover:bg-primary-100 p-2 shadow-none text-primary-text focus:ring-0 ",
                        {
                            "absolute z-15 right-[0px] bottom-[-20px]": smallBar
                        })}
                    variant={"alternative"}
                    onClick={() => setSmallBar((prev) => !prev)}
                >
                    {smallBar ?
                        <PanelRightClose
                            size={20}
                        />
                        :
                        <PanelLeftClose
                            size={20}
                        />
                    }
                </AppButton>

            </div>


            <div
                className={"flex-1 flex flex-col justify-between px-4 my-6"}
            >
                <div
                    className={"w-full"}
                >

                    <div
                        className={cn("border-[1px]  border-gray-300 rounded-md drop-shadow-md bg-gray-white p-4 ",
                            {
                                "w-fit px-0 py-0 mx-auto bg-gray-white/0  flex justify-center items-center border-0 ": smallBar
                            }
                        )}
                    >
                        <UserAvatarWithDetails
                            avatarClassName={"size-[40px]"}
                            emailClassName={cn("text-[.5rem]", {"hidden": smallBar})}
                            nameClassName={cn("text-[.7rem]", {"hidden": smallBar})}
                            user={user ?? {email: ""}}
                        />
                    </div>

                    <p
                        className={cn(
                            "my-4 font-normal text-[.7rem] text-gray-text ",
                            {"hidden": smallBar}
                        )}
                    >MAIN</p>

                    <DashboardSideBarLinkMenu user={user} links={dashboardSideBarLinkMainItems} smallBar={smallBar}/>

                    <Separator className={"my-4"}/>

                    <DashboardSideBarLinkMenu user={user} links={dashboardSideBarLinkSettingItems} smallBar={smallBar}/>
                </div>


                <SignOutActionButton iconOnly={smallBar}/>
            </div>

        </aside>
    )
}
