import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {cn} from "@/lib/utils";
import React from "react";

export default function CustomTooltip({className, children, tipContent}: {
    className?: string,
    children: React.ReactNode,
    tipContent: React.ReactNode
}) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>
                <TooltipContent
                    side={"right"}
                    className={
                        cn(
                            "bg-gray-black text-gray-white",
                            className
                        )
                    }
                >
                    {tipContent}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
