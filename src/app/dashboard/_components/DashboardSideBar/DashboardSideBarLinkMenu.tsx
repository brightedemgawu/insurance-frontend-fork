import {cn} from "@/lib/utils";
import {DashboardSideBarLinkItemType} from "@/constants/links/dashboard-links";
import DashboardSideBarLinkItem from "@/app/dashboard/_components/DashboardSideBar/DashboardSideBarLinkItem";

export default function DashboardSideBarLinkMenu(
    {links, className, smallBar}:
        { links: DashboardSideBarLinkItemType[], className?: string, smallBar: boolean }
) {
    return (
        <div
            className={
                cn(
                    "flex md:mx-auto justify-center flex-col w-full  md:w-[224px]",
                    className,
                    {
                        "w-fit mt-4 md:w-fit": smallBar,
                    }
                )
            }
        >

            {links.map((link, index) => {


                return (
                    <DashboardSideBarLinkItem
                        smallBar={smallBar}
                        link={link}
                        key={index}
                    />
                )
            })}

        </div>
    )
}
