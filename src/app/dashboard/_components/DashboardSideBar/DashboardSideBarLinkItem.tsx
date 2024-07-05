"use client"

import {DashboardSideBarLinkItemType} from "@/constants/links/dashboard-links";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {cn} from "@/lib/utils";
import CustomTooltip from "@/components/CustomTooltip";

export default function DashboardSideBarLinkItem({link, smallBar}: {
    link: DashboardSideBarLinkItemType,
    smallBar: boolean
}) {
    const pathname = usePathname()
    const isActive = pathname === link.link;
    return (
        <Link
            href={link.link}
            className={
                cn(
                    "group w-full hover:bg-primary-50 mb-[5px] px-4 py-[.5em] rounded-md mx-auto flex gap-2 items-center justify-start"
                    ,
                    {
                        "hover:bg-gray-white justify-center": smallBar,
                        "bg-primary-50/70 text-primary-text": isActive && !smallBar,
                    }
                )
            }
        >
            {link.icon &&
                <CustomTooltip
                    className={cn({"hidden": !smallBar})}
                    tipContent={<p>{link.name}</p>}>
                    <link.icon
                        size={20}
                        className={
                            cn("hover:text-primary-surface text-gray-text-caption ",
                                {
                                    "text-primary-text": isActive
                                }
                            )
                        }
                    />
                </CustomTooltip>

            }
            <p
                className={
                    cn(
                        "font-medium  overflow-hidden  text-gray-700 w-fit text-[1rem] md:text-[.8rem] ",
                        {
                            "w-0 h-0": smallBar,
                            "text-primary-text": isActive
                        }
                    )}
            >
                {link.name}
            </p>
        </Link>
    )
}
