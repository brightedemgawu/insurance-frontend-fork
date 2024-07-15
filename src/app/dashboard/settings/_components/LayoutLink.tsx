"use client"

import {SettingsLayoutLinks} from "@/constants/links/dashboard-links";
import Link from "next/link";
import {cn, userMeetsRequiredPermissions} from "@/lib/utils";
import {usePathname} from "next/navigation";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";

export default function LayoutLink() {
    const pathname = usePathname();

    const user = useSelector((state: RootState) => state.auth.authenticatedUser);
    return (
        SettingsLayoutLinks.map((link, index) => {
            if (link.permissions && !userMeetsRequiredPermissions(user, link.permissions)) {
                return null
            }

            return (
                <Link
                    key={index}
                    className={
                        cn(
                            ["min-w-fit text-gray-text tracking-wider text-[.9rem] bg-gray-200/50 px-6",
                                "hover:text-primary-text flex items-center h-[40px] "],
                            {
                                "text-primary-text bg-gray-white border-b-[2px] font-medium border-primary-border": pathname.startsWith(link.link),
                            }
                        )
                    }
                    href={link.link}
                >
                    {link.name}
                </Link>
            )
        })


    )
}
