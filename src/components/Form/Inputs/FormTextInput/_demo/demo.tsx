import {z} from "zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import FormTextInput from "@/components/Form/Inputs/FormTextInput/FormTextInput";
import ActionButton from "@/components/Button/ActionButton";

const schema = z.object({
    email: z.string().email({message: 'Enter a valid email'}),
    password: z.string().min(1, {message: 'Enter your password'}),
});

type FormFields = z.infer<typeof schema>;

function Demo() {

    const {
        register,
        handleSubmit,
        setError,
        formState: {errors, isSubmitting},
    } = useForm<FormFields>({
        resolver: zodResolver(schema),
    });
    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        console.log(data)
        await new Promise(resolve => setTimeout(resolve, 3000));
    }

    return (
        <div
            className={"w-[100vw] h-screen flex justify-center items-center"}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-[50%]  flex flex-col gap-[1.5rem] items-center justify-center mx-auto"
            >
                <FormTextInput<FormFields>
                    label="Email"
                    required={true}
                    placeholder="Email"
                    register={register}
                    name="email"
                    invalid={!!(errors.email && errors.email.message)}
                    error={errors.email?.message}

                />
                <FormTextInput<FormFields>
                    label="Password"
                    required={true}
                    placeholder="Password"
                    register={register}
                    name="password"
                    invalid={!!(errors.password && errors.password.message)}
                    error={errors.password?.message}/>

                <ActionButton
                    loading={isSubmitting}
                    type={"submit"}>
                    Submit
                </ActionButton>
            </form>
        </div>
    )
}
