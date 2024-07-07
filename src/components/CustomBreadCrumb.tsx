"use client"

import {usePathname} from "next/navigation";
import {Breadcrumb, BreadcrumbItem, BreadcrumbList} from "@/components/ui/breadcrumb";
import Link from "next/link";
import {ChevronRight} from "lucide-react";
import {capitalizeFirstLetter, cn} from "@/lib/utils";

export default function CustomBreadCrumb({basePath}: { basePath?: string }) {
    const pathname = usePathname();

    // Combine basePath and pathname efficiently
    const fullPath = basePath ? pathname.startsWith(basePath) ? pathname.slice(basePath.length) : pathname : pathname;

    // Split and filter path segments for clarity
    const pathSegments = fullPath.split("/").filter(Boolean);

    return (
        <Breadcrumb>
            <BreadcrumbList
                className={"gap-1.5"}
            >
                {pathSegments.map((item, index) => (
                    <div key={index} className="flex items-center">
                        <ChevronRight
                            className={"text-gray-600"}
                            size={15}/>
                        <BreadcrumbItem>
                            <Link
                                className={cn(
                                    "text-[.8rem]  text-gray-800",
                                    {"text-primary-text": index !== pathSegments.length - 1})}
                                href={`${basePath}/${item}`}
                            >
                                {capitalizeFirstLetter(item)}
                            </Link>
                        </BreadcrumbItem>
                    </div>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
