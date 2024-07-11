"use client"
import {Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import React, {useEffect, useState} from "react";
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
import {FilePenLine, UserRoundPlus} from "lucide-react";
import FormSelectInput from "@/components/Form/Inputs/FormTextInput/FormSelectInput";
import {ReadAccessLevelDto} from "@/services/access-levels/dtos/response/ReadAccessLevelDto";
import {EmployeeReadDto} from "@/services/users/dto/Response/EmployeeReadDto";
import {UpdateEmployeeDto} from "@/services/users/dto/Request/UpdateEmployeeDto";


const schema = z.object({
    email: z.string().email({message: 'Please enter a valid email address'}),
    firstName: z.string({message: "name is required"}).min(3, {message: 'Length should be greater than 3 characters'}),
    lastName: z.string({message: "name is required"}).min(3, {message: 'Length should be greater than 3 characters'}),
    otherName: z.string(),
    accessLevelId: z.string({message: 'Access level is required'}).min(1, {message: "Access level is required"}),
    role: z.string({message: "role is required"})
});

type FormFields = z.infer<typeof schema>;


export default function StaffFormDialog({
                                            dto,
                                            authenticatedUser,
                                            updateTable,
                                            accessLevels
                                        }: {
    dto?: EmployeeReadDto,
    authenticatedUser: number,
    updateTable: () => Promise<void>,
    accessLevels: ReadAccessLevelDto[]
}) {
    const [open, setOpen] = useState(false);


    const {
        register,
        handleSubmit,
        setError,
        reset,
        setValue,
        getValues,
        formState: {errors, isSubmitting},
    } = useForm<FormFields>({
        resolver: zodResolver(schema),
        defaultValues: {
            role: UserTypes.Employee
        }
    });

    useEffect(() => {
        if (dto) {
            setValue("email", dto.email ?? "")
            setValue("firstName", dto?.employeeInfo?.firstName ?? "")
            setValue("lastName", dto?.employeeInfo?.lastName ?? "")
            setValue("otherName", dto?.employeeInfo?.otherName ?? "")
            setValue("accessLevelId", dto?.accessLevelId?.toString() ?? "")
        }
    }, [dto]);

    const {createEmployee, updatedEmployee} = useUsersService()


    const onCreateEmployee = async (data: CreateEmployeeDto) => {

        await createEmployee(data)
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
    }

    const onUpdateEmployee = async (data: UpdateEmployeeDto) => {

        await updatedEmployee(data)
            .then((response) => {
                if (response.success) {
                    toast.success("Staff successfully updated!")
                    updateTable()
                    setOpen(false)
                } else {
                    toast.error("Error updating Employee")
                }
            })
            .catch(errors => {
                handleFormApiErrors<FormFields>(errors,
                    setError,
                    Object.keys(schema.shape),
                    "Failed To Update Staff",
                )
            })
    }

    const onSubmit: SubmitHandler<FormFields> = async (data) => {

        if (dto) {
            await onUpdateEmployee(
                {...data, userType: data.role, updatedBy: authenticatedUser}
            )
            return
        } else {
            await onCreateEmployee(
                {...data, userType: data.role, createdBy: authenticatedUser}
            )
        }
    };


    return (
        <Dialog
            open={open} onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <div>


                    {
                        dto ?
                            <FilePenLine
                                size={20}
                                className={" h-4 w-4 text-gray-text-caption cursor-pointer "}
                            />
                            : <AppButton
                                className={"md:px-6 text-[.8rem] "}
                            >
                                <UserRoundPlus
                                    size={16}
                                />
                                Add Staff
                            </AppButton>
                    }
                </div>
            </DialogTrigger>

            <DialogContent className="w-[95%]  sm:max-w-[450px]">

                <DialogHeader>
                    <DialogTitle>
                        <h1
                            className={"text-[1.1rem] text-gray-text font-[700]"}
                        >
                            Add Staff
                        </h1>
                    </DialogTitle>
                </DialogHeader>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full flex flex-col gap-[1rem] items-center justify-center"
                >
                    <FormTextInput<FormFields>
                        disabled={!!dto}
                        label="Email"
                        required={true}
                        placeholder="Enter Staff Email"
                        register={register}
                        name="email"
                        errors={errors}

                    />
                    <FormTextInput<FormFields>
                        label="First Name"
                        required={true}
                        placeholder="Enter Staff First Name"
                        register={register}
                        name="firstName"
                        errors={errors}


                    />
                    <FormTextInput<FormFields>
                        label="Last Name"
                        required={true}
                        placeholder="Enter Staff Last Name"
                        register={register}
                        name="lastName"
                        errors={errors}
                    />

                    <FormTextInput<FormFields>
                        label="Other Name"
                        placeholder="Enter Staff Other Name"
                        register={register}
                        name="otherName"
                        errors={errors}
                    />

                    <FormSelectInput<FormFields>
                        required={true}
                        defaultValue={getValues("accessLevelId")}
                        label="Access Level"
                        placeholder="Select Staff Access Level"
                        register={register}
                        onValueChange={(value) => {
                            setValue("accessLevelId", value)
                        }}
                        values={accessLevels?.map((item) => ({name: item.name, value: item.id.toString()}))}
                        name="accessLevelId"
                        errors={errors}
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
