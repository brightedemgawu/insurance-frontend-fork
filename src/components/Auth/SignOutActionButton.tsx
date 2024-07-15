"use client"


import {useUserSignOut} from "@/hooks/auth/useUserSignOut";
import ActionButton from "@/components/Button/ActionButton";
import {toast} from "sonner";
import {LogOut} from "lucide-react";
import {cn} from "@/lib/utils";

export default function SignOutActionButton({iconOnly}: { iconOnly?: boolean }) {

    const {signOutUser} = useUserSignOut();

    return (
        <ActionButton
            variant="destructive"
            className={cn(
                "w-full text-[12px] py-2"
            )}
            onClick={async () => {
                await signOutUser().then(() => {
                    toast.success("Sign-out Successful", {description: "You have been successfully signed out."});
                });
            }}
        >
            <LogOut
                className="text-gray-text-white"
                size={15}
            />
            {!iconOnly && "Sign Out"}
        </ActionButton>
    )
}
