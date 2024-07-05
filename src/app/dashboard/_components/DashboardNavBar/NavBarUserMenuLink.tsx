"use client"

import {usePathname} from "next/navigation";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {UserMenuNavBarLink} from "@/constants/links/navbar-links";

export default function NavBarUserMenuLink({className, link}: {
    className?: string,
    link: UserMenuNavBarLink,
}) {

    const pathname = usePathname();
    const isActiveLink: boolean = pathname === link.link;

    return (
        <Link
            href={link.link}
            className={cn("text-[.85rem] text-gray-text tracking-wider font-[400] hover:text-primary-text",
                className,
                {"text-primary-text": isActiveLink}
            )}
        >
            {link.name}
        </Link>
    )
}
