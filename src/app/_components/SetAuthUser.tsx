"use client"

import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {setAuthUser} from "@/store/features/auth/authSlice";
import {AuthenticatedUser} from "@/types/authentication";

export default function SetAuthUser({user}: { user: AuthenticatedUser | null }) {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setAuthUser(user))
    });

    return null
}
