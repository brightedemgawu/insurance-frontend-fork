import {cn} from "@/lib/utils";
import {ReactNode} from "react";

export default function MaxWidthWrapper({children, className}: { children: ReactNode, className?: string }) {
    return (
        <div
            className={cn("w-full max-w-screen-2xl 2xl:mx-auto px-[1rem] md:px-[2rem] 2xl:px-0", className)}>{children}</div>
    );
}
