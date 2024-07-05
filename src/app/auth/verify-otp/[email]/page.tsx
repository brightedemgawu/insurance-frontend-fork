import {Separator} from "@/components/ui/separator";
import VerifyOtpCodeForm from "@/app/auth/_components/VerifyOtpCodeForm";

export default function Page({params}: { params: { email: string } }) {
    return (
        <div
            className={"md:p-8 md:drop-shadow-2xl md:rounded-md w-[450px]  bg-gray-white"}
        >
            <h3
                className="text-gray-text text-[2rem] font-[700]"
            >
                Otp Verification
            </h3>

            <div
                className={"mt-4 mb-2"}
            >
                <h3 className="text-gray-text  text-[1.2rem] font-[600]">
                    Please Enter Secure Code
                </h3>
                <p className="font-medium text-sm text-gray-text-caption">
                    You have a
                    <span className="mx-[4px] font-bold text-gray-text ">
                    10 minutes
                    </span>
                    window to utilize this code before it becomes invalid.
                </p>
            </div>

            <Separator
                className={"mb-8"}
            />

            <VerifyOtpCodeForm email={params.email}/>

        </div>
    )
}
