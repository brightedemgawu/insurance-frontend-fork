"use client"

import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
import React, {useEffect, useState} from "react";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import UserProfileSection from "@/app/dashboard/profile/_components/UserProfileSection";

interface OnBoardingProps {
}

const OnBoarding = ({}: OnBoardingProps) => {
    const authenticatedUser = useSelector((state: RootState) => state.auth.authenticatedUser);
    const [open, setOpen] = useState(true);

    useEffect(() => {
        if (authenticatedUser) {
            setOpen(authenticatedUser.onboarding)
        }

    }, [authenticatedUser]);
    return (
        <Dialog
            open={open}
        >
            <DialogContent
                hideCloseIcon={true}
                className="w-[95%] max-h-[90vh] overflow-y-scroll custom-scrollbar  md:min-w-[900px]">

                <DialogHeader>
                    <DialogTitle>
                        <h1
                            className={"w-full p-4 bg-warning-400/50 text-[1.1rem] text-gray-text"}
                        >
                            Complete Your Profile
                        </h1>
                    </DialogTitle>
                </DialogHeader>
                <UserProfileSection onProfilePage={false}/>
            </DialogContent>
        </Dialog>
    )
}

export default OnBoarding;
