"use client"
import {z} from "zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import FormTextInput from "@/components/Form/Inputs/FormTextInput/FormTextInput";
import ActionButton from "@/components/Button/ActionButton";
import FormTextAreaInput from "@/components/Form/Inputs/FormTextInput/FormTextAreaInput";
import {CreateAccessLevelDto} from "@/services/access-levels/dtos/request/CreateAccessLevelDto";

const schema = z.object({
    name: z.string({message: "name is required"}).min(6, {message: 'Length should be greater than 6 characters'}),
    description: z.string({message: "description is required"}).min(20, {message: 'Length should be greater than 20 characters'}),
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
                invalid={!!(errors.name && errors.name.message)}
                error={errors.name?.message}

            />
            <FormTextAreaInput<FormFields>
                className={"md:h-[100px]"}
                label="Description"
                required={true}
                placeholder="Description"
                register={register}
                name="description"
                invalid={!!(errors.description && errors.description.message)}
                error={errors.description?.message}

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
