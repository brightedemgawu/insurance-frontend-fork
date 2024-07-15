import React, {LegacyRef} from "react";
import {VariantProps} from "class-variance-authority";
import {buttonStyleVariants} from "@/components/Button/buttonStyleVariants";
import {cn} from "@/lib/utils";


export type AppButtonProps = VariantProps<typeof buttonStyleVariants> & {
    buttonRef?: LegacyRef<HTMLButtonElement>;
    children?: React.ReactNode;
    className?: string;
    disabled?: boolean;
    loading?: boolean;
    onClick?: () => void | Promise<void>;
    type?: "button" | "submit";

}

export default function AppButton({className, variant, buttonRef, onClick, type = "button", ...props}: AppButtonProps) {
    return (<button
            ref={buttonRef}
            className={cn(buttonStyleVariants({variant, className}))}
            onClick={async () => {
                onClick && await onClick()
            }}
            type={type}
            {...props}
        />
    )
}
