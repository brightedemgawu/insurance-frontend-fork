"use client"
import {z} from "zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import FormTextInput from "@/components/Form/Inputs/FormTextInput/FormTextInput";
import ActionButton from "@/components/Button/ActionButton";
import FormTextAreaInput from "@/components/Form/Inputs/FormTextInput/FormTextAreaInput";
import {CreateAccessLevelDto} from "@/services/access-levels/dtos/request/CreateAccessLevelDto";

const schema = z.object({
    name: z.string({message: "name is required"}).min(4, {message: 'Length should be greater than 4 characters'}),
    description: z.string({message: "description is required"}).min(2, {message: 'Length should be greater than 2 characters'}),
});

type FormFields = z.infer<typeof schema>;
export default function BasicInfoForm({dto, onChangeTap}: {
    dto: CreateAccessLevelDto,
    onChangeTap: (value: CreateAccessLevelDto) => void
}) {
    const {
        register,
        handleSubmit,
        setError,
        formState: {errors, isSubmitting},
    } = useForm<FormFields>({
        resolver: zodResolver(schema),
        defaultValues: {...dto}
    });
    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        dto = {...dto, ...data}
        onChangeTap(dto);
    };
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-[1.5rem] items-center justify-center"
        >
            <FormTextInput<FormFields>
                className={"md:h-[45px]"}
                label="Access level name"
                required={true}
                placeholder="Enter Access level name"
                register={register}
                name="name"
                errors={errors}

            />
            <FormTextAreaInput<FormFields>
                className={"md:h-[100px]"}
                label="Description"
                required={true}
                placeholder="Description"
                register={register}
                name="description"
                errors={errors}
            />
            <div
                className={"w-full"}
            >
                <ActionButton
                    className={"py-2"}
                    loading={isSubmitting}
                    type={"submit"}>
                    CONTINUE
                </ActionButton>
            </div>
        </form>
    )
}
