"use client"

import {useDispatch} from "react-redux";
import {signOut} from "next-auth/react";
import {clearAuthStore} from "@/store/features/auth/authSlice";

export const useUserSignOut = () => {

    const dispatch = useDispatch();

    const signOutUser = async () => {
        await signOut().then(() => {
                dispatch(clearAuthStore())
            }
        )
    }

    return {signOutUser}
}
