"use client"

import z from "zod"
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import ActionButton from "@/components/Button/ActionButton";
import FormTextInput from "@/components/Form/Inputs/FormTextInput/FormTextInput";

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


    const onSubmit: SubmitHandler<FormFields> = async (data) => {

        await new Promise(resolve => setTimeout(resolve, 500));

        toast.success("Email Sent Successfully", {
            description: "An email with the OTP code has been sent to your address.",
        })
        router.push(`/auth/verify-otp/${data.email}`);

    };


    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-[1.5rem] items-center justify-center"
        >
            <FormTextInput<FormFields>
                label="Email"
                required={true}
                placeholder="Enter your email"
                register={register}
                name="email"
                invalid={!!(errors.email && errors.email.message)}
                error={errors.email?.message}

            />
            <ActionButton
                className={"w-full py-3"}
                loading={isSubmitting}
                type={"submit"}>
                SEND OTP CODE
            </ActionButton>
        </form>
    )
}
