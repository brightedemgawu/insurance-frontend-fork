"use client"

import z from "zod"
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import ActionButton from "@/components/Button/ActionButton";
import FormTextInput from "@/components/Form/Inputs/FormTextInput/FormTextInput";
import useAuthenticationService from "@/services/authentication/useAuthenticationService";
import {SendOtpCodeDto} from "@/services/authentication/dtos/request/SendOtpCodeDto";
import {handleFormApiErrors} from "@/lib/handleApiErrors";

const schema = z.object({
    email: z.string().email({message: 'Please enter a valid email address'}),
});

type FormFields = z.infer<typeof schema>;


export default function SendOtpForm() {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        setError,
        formState: {errors, isSubmitting},
    } = useForm<FormFields>({
        resolver: zodResolver(schema),
    });
    const {sendOtpCode} = useAuthenticationService();


    const onSubmit: SubmitHandler<FormFields> = async (data) => {

        const dto: SendOtpCodeDto = {email: data.email}
        await sendOtpCode(dto).then((response) => {
            if (response.success) {
                toast.success("Email Sent Successfully", {
                    description: "An email with the OTP code has been sent to your address.",
                })
                router.push(`/auth/verify-otp/${data.email}`);
            } else {
                toast.error("Login Error", {description: "An unexpected error occurred. Please try again."});
            }

        }).catch((err) => {
            handleFormApiErrors<FormFields>(err,
                setError,
                Object.keys(schema.shape),
                "Failed To Send Otp Code",
            )
        })
    };


    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-[1.5rem] items-center justify-center"
        >
            <FormTextInput<FormFields>
                className={"md:h-[45px]"}
                label="Email"
                required={true}
                placeholder="Enter your email"
                register={register}
                name="email"
                errors={errors}

            />
            <ActionButton
                className={"w-full py-3"}
                loading={isSubmitting}
                type={"submit"}
            >
                SEND OTP CODE
            </ActionButton>
        </form>
    )
}
