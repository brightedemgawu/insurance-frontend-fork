"use client"
import {Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import React, {useState} from "react";
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
import {UserRoundPlus} from "lucide-react";
import FormSelectInput from "@/components/Form/Inputs/FormTextInput/FormSelectInput";
import {ReadAccessLevelDto} from "@/services/access-levels/dtos/response/ReadAccessLevelDto";


const schema = z.object({
    email: z.string().email({message: 'Please enter a valid email address'}),
    firstName: z.string({message: "name is required"}).min(3, {message: 'Length should be greater than 3 characters'}),
    lastName: z.string({message: "name is required"}).min(3, {message: 'Length should be greater than 3 characters'}),
    otherName: z.string(),
    accessLevelId: z.string({message: 'Access level is required'}).min(1, {message: "Access level is required"}),
    role: z.string({message: "role is required"})
});

type FormFields = z.infer<typeof schema>;


export default function StaffFormDialog({updateTable, accessLevels}: {
    updateTable: () => Promise<void>,
    accessLevels: ReadAccessLevelDto[]
}) {
    const authUser = useSelector((state: RootState) => state.auth.authenticatedUser);
    const [open, setOpen] = useState(false);


    const {
        register,
        handleSubmit,
        setError,
        reset,
        setValue,
        formState: {errors, isSubmitting},
    } = useForm<FormFields>({
        resolver: zodResolver(schema),
        defaultValues: {
            role: UserTypes.Employee
        }
    });
    const {createEmployee} = useUsersService()
    const onSubmit: SubmitHandler<FormFields> = async (data) => {


        const dto: CreateEmployeeDto = {...data, userType: data.role, createdBy: authUser!.id}
        await createEmployee(dto)
            .then((response) => {
                if (response.success) {
                    toast.success("Employee successfully created!")
                    reset()
                    updateTable()
                    setOpen(false)
                } else {
                    toast.error("Error creating Employee")
                }
            })
            .catch(errors => {
                handleFormApiErrors<FormFields>(errors,
                    setError,
                    Object.keys(schema.shape),
                    "Failed To Create Staff",
                )
            })
    };


    if (authUser && !(authUser.userType === UserTypes.Admin || authUser.accessLevel?.permissions?.manage_users)) {
        return null
    }


    return (
        <Dialog
            open={open} onOpenChange={setOpen}
        >
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

            <DialogContent className="w-[95%]  sm:max-w-[450px]">
                <DialogTitle>
                    <h1
                        className={"text-[1.1rem] text-gray-text font-[700]"}
                    >
                        Add Staff
                    </h1>
                </DialogTitle>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full flex flex-col gap-[1rem] items-center justify-center"
                >
                    <FormTextInput<FormFields>
                        label="Email"
                        required={true}
                        placeholder="Enter Staff Email"
                        register={register}
                        name="email"
                        invalid={!!(errors.email && errors.email.message)}
                        error={errors.email?.message}
                    />
                    <FormTextInput<FormFields>
                        label="First Name"
                        required={true}
                        placeholder="Enter Staff First Name"
                        register={register}
                        name="firstName"
                        invalid={!!(errors.firstName && errors.firstName.message)}
                        error={errors.firstName?.message}


                    />
                    <FormTextInput<FormFields>
                        label="Last Name"
                        required={true}
                        placeholder="Enter Staff Last Name"
                        register={register}
                        name="lastName"
                        invalid={!!(errors.lastName && errors.lastName.message)}
                        error={errors.lastName?.message}
                    />

                    <FormTextInput<FormFields>
                        label="Other Name"
                        placeholder="Enter Staff Other Name"
                        register={register}
                        name="otherName"
                        invalid={!!(errors.otherName && errors.otherName.message)}
                        error={errors.otherName?.message}
                    />

                    <FormSelectInput<FormFields>
                        label="Access Level"
                        placeholder="Select Staff Access Level"
                        register={register}
                        onValueChange={(value) => {
                            setValue("accessLevelId", value)
                        }}
                        values={accessLevels?.map((item) => ({name: item.name, value: item.id.toString()}))}
                        name="accessLevelId"
                        invalid={!!(errors.accessLevelId && errors.accessLevelId.message)}
                        error={errors.accessLevelId?.message}
                    />


                    <div
                        className={"w-full flex justify-start items-center gap-2"}
                    >
                        <DialogClose>
                            <ActionButton
                                variant="destructive"
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
