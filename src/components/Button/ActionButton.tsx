"use client"

import AppButton, {AppButtonProps} from "@/components/Button/AppButton";
import {useState} from "react";
import {ReloadIcon} from "@radix-ui/react-icons";

export default function ActionButton({children, onClick, loading, disabled, ...props}: AppButtonProps) {
    const [isExecuting, setIsExecuting] = useState<boolean>(false)

    return (
        <AppButton
            {...props}
            onClick={async () => {
                setIsExecuting(true)
                onClick && await onClick();
                setIsExecuting(false)
            }}
            disabled={loading || isExecuting || disabled}
        >
            {(loading || isExecuting) &&
                <ReloadIcon className="h-4 w-4 animate-spin"/>
            }
            {children}
        </AppButton>
    );
}
