import VerifyMfa from "@/app/auth/_components/verifyMfa/VerifyMfa";

export default function Page({params}: { params: { email: string } }) {
    return <VerifyMfa email={decodeURIComponent(params.email)}/>
}
