import {useRouter} from "next/navigation";
import {useDispatch} from "react-redux";
import {signIn} from "next-auth/react";
import {toast} from "sonner";
import {setAuthUser} from "@/store/features/auth/authSlice";

export const useSignInUser = () => {
    const router = useRouter()
    const dispatch = useDispatch();

    const signInUser = (tokens: {
        accessToken: string
    }, url?: string, shouldToast?: boolean, toastDescription?: string, toastMessage?: string) => {
        signIn("credentials", {...tokens, redirect: false}).then(() => {
            shouldToast && toast.success(toastMessage || "Sign in successful",
                {
                    description: toastDescription || "Welcome back, You have successfully signed in."
                }
            );
            url && router.push(url)
            dispatch(setAuthUser({email: tokens.accessToken}))
            router.refresh()
        })
    }

    return {signInUser}
}
