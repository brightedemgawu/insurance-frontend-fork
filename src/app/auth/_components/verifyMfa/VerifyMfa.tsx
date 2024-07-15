"use client"

import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {useRouter} from "next/navigation";
import ConnectMfaForm from "@/app/auth/_components/connectMfaForm/connectMfaForm";
import VerifyMfaForm from "@/app/auth/_components/verifyMfa/VerifyMfaForm";

interface VerifyMfaProps {
    email: string;
}

const VerifyMfa = ({email}: VerifyMfaProps) => {

    const authenticatedUserMfa = useSelector((state: RootState) => state.auth.mfa);
    const router = useRouter();

    if (authenticatedUserMfa === null) {
        router.push("/");
        return
    }

    if (authenticatedUserMfa!.mfaEnabled) {
        return <VerifyMfaForm mfaQrCode={authenticatedUserMfa.mfaQrCode} email={email}/>
    }

    return (
        <ConnectMfaForm email={email} mfaQrCode={authenticatedUserMfa.mfaQrCode}/>
    )
}

export default VerifyMfa;
