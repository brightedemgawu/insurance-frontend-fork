import {Separator} from "@/components/ui/separator";
import SendOtpForm from "@/app/auth/_components/SendOtpForm";

export default function Page() {
    return (
        <div
            className={" md:px-4  py-8  drop-shadow-none md:drop-shadow-2xl md:rounded-md w-full  md:w-[450px]   bg-gray-white"}
        >
            <h3
                className="text-gray-text text-[2rem] font-[700]"
            >
                Welcome
            </h3>

            <div
                className={"mt-4 mb-2"}
            >
                <p className="font-medium text-sm text-gray-text-caption">
                    Enter your email address to receive a one-time otp.
                </p>
            </div>

            <Separator
                className={"mb-8"}
            />

            <SendOtpForm/>
        </div>
    )
}
