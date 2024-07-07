"use client"

import {SettingsLayoutLink} from "@/constants/links/dashboard-links";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {usePathname} from "next/navigation";

export default function LayoutLink({link}: { link: SettingsLayoutLink }) {
    const pathname = usePathname();

    return (
        <Link
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
}
