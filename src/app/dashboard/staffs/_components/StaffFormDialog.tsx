"use client"
import {Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger} from "@/components/ui/dialog";
import React from "react";
import AppButton from "@/components/Button/AppButton";
import z from "zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {UserTypes} from "@/types/authentication";
import FormTextInput from "@/components/Form/Inputs/FormTextInput/FormTextInput";
import ActionButton from "@/components/Button/ActionButton";
import useUsersService from "@/services/users/useUsersService";
import {CreateEmployeeDto} from "@/services/users/dto/Request/CreateEmployeeDto";
import {handleFormApiErrors} from "@/lib/handleApiErrors";
import {toast} from "sonner";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {useRouter} from "next/navigation";
import {UserRoundPlus} from "lucide-react";


const schema = z.object({
    email: z.string().email({message: 'Please enter a valid email address'}),
    firstName: z.string({message: "name is required"}).min(3, {message: 'Length should be greater than 3 characters'}),
    lastName: z.string({message: "name is required"}).min(3, {message: 'Length should be greater than 3 characters'}),
    otherName: z.string(),
    role: z.string({message: "role is required"})
});

type FormFields = z.infer<typeof schema>;


export default function StaffFormDialog({updateTable}: { updateTable: () => Promise<void> }) {
    const {
        register,
        handleSubmit,
        setError,
        reset,
        formState: {errors, isSubmitting},
    } = useForm<FormFields>({
        resolver: zodResolver(schema),
        defaultValues: {
            role: UserTypes.Employee
        }
    });
    const router = useRouter();
    const authUser = useSelector((state: RootState) => state.auth.authenticatedUser);
    const {createEmployee} = useUsersService()
    const onSubmit: SubmitHandler<FormFields> = async (data) => {
        const dto: CreateEmployeeDto = {...data, userType: data.role, createdBy: authUser!.id}
        await createEmployee(dto)
            .then((response) => {
                if (response.success) {
                    toast.success("Employee successfully created!")
                    reset()
                    updateTable()

                } else {
                    toast.error("Error creating Employee")
                }
            })
            .catch(errors => {
                handleFormApiErrors<FormFields>(errors,
                    setError,
                    Object.keys(schema.shape),
                    "Failed To Send Otp Code",
                )
            })
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div>

                    <AppButton
                        className={"md:px-6 md:text-[1.2rem]"}
                    >
                        <UserRoundPlus/>
                        Add Staff
                    </AppButton>
                </div>
            </DialogTrigger>

            <DialogContent className="w-[95%] sm:max-w-[450px]">
                <DialogHeader>
                    <h1
                        className={"text-[1.1rem] text-gray-text font-[700]"}
                    >
                        Add Staff
                    </h1>
                </DialogHeader>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full flex flex-col gap-[1rem] items-center justify-center"
                >
                    <FormTextInput<FormFields>
                        className={"md:h-[45px]"}
                        label="Email"
                        required={true}
                        placeholder="Enter Staff Email"
                        register={register}
                        name="email"
                        invalid={!!(errors.email && errors.email.message)}
                        error={errors.email?.message}
                    />
                    <FormTextInput<FormFields>
                        className={"md:h-[45px]"}
                        label="First Name"
                        required={true}
                        placeholder="Enter Staff First Name"
                        register={register}
                        name="firstName"
                        invalid={!!(errors.firstName && errors.firstName.message)}
                        error={errors.firstName?.message}


                    />
                    <FormTextInput<FormFields>
                        className={"md:h-[45px]"}
                        label="Last Name"
                        required={true}
                        placeholder="Enter Staff Last Name"
                        register={register}
                        name="lastName"
                        invalid={!!(errors.lastName && errors.lastName.message)}
                        error={errors.lastName?.message}
                    />

                    <FormTextInput<FormFields>
                        className={"md:h-[45px]"}
                        label="Other Name"
                        placeholder="Enter Staff Other Name"
                        register={register}
                        name="otherName"
                        invalid={!!(errors.otherName && errors.otherName.message)}
                        error={errors.otherName?.message}
                    />
                    <FormTextInput<FormFields>
                        className={"md:h-[45px]"}
                        label="Staff role"
                        placeholder="Staff role"
                        register={register}
                        disabled={true}
                        name="role"
                        invalid={!!(errors.role && errors.role.message)}
                        error={errors.role?.message}
                    />
                    <div
                        className={"w-full flex justify-start items-center gap-2"}
                    >
                        <DialogClose>
                            <ActionButton
                                variant="destructive"
                                className={"bg-gray-white text-error-text border-2 hover:bg-gray-white py-2 border-error-border  "}
                                loading={false}>
                                Cancel
                            </ActionButton>
                        </DialogClose>
                        <ActionButton
                            loading={isSubmitting}
                            type={"submit"}
                        >
                            Confirm
                        </ActionButton>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
