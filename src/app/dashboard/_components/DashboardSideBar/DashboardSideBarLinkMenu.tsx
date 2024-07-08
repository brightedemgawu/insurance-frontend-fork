import {cn} from "@/lib/utils";
import {DashboardSideBarLinkItemType} from "@/constants/links/dashboard-links";
import DashboardSideBarLinkItem from "@/app/dashboard/_components/DashboardSideBar/DashboardSideBarLinkItem";
import {AuthenticatedUser} from "@/types/authentication";

export default function DashboardSideBarLinkMenu(
    {links, className, smallBar, user}:
        { links: DashboardSideBarLinkItemType[], className?: string, smallBar: boolean, user: AuthenticatedUser | null }
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

                if (link.predicate && !link.predicate(user)) {
                    return null
                }

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
