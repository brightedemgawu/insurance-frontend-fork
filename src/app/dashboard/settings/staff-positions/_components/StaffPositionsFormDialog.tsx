import {StaffPositionsReadDto} from "@/services/staff-positions/dto/response/StaffPositionsReadDto";
import z from "zod";
import React, {useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {CreateStaffPositionDto} from "@/services/staff-positions/dto/request/CreateStaffPositionDto";
import {UpdateStaffPositionDto} from "@/services/staff-positions/dto/request/UpdateStaffPositionDto";
import {Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {FilePenLine, Users} from "lucide-react";
import AppButton from "@/components/Button/AppButton";
import FormTextInput from "@/components/Form/Inputs/FormTextInput/FormTextInput";
import ActionButton from "@/components/Button/ActionButton";
import FormTextAreaInput from "@/components/Form/Inputs/FormTextInput/FormTextAreaInput";
import useStaffPositionsService from "@/services/staff-positions/useStaffPositionsService";
import {toast} from "sonner";
import {handleFormApiErrors} from "@/lib/handleApiErrors";

interface StaffPositionsFormDialogProps {
    dto?: StaffPositionsReadDto,
    authenticatedUser: string,
    updateTable: () => Promise<void>
}


const schema = z.object({
    name: z.string({message: "Name is required"}).min(3, {message: 'Length should be greater than 3 characters'}),
    description: z.string({message: "Description is required"}).min(3, {message: 'Length should be greater than 3 characters'}),
});

type FormFields = z.infer<typeof schema>;


const StaffPositionsFormDialog = ({dto, updateTable, authenticatedUser}: StaffPositionsFormDialogProps) => {

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
    });


    const {createStaffPositions, updateStaffPositions} = useStaffPositionsService()

    useEffect(() => {
        if (dto) {
            setValue("name", dto.name ?? "")
            setValue("description", dto.description ?? "")
        }
    }, [dto]);


    const onCreateStaffPosition = async (data: CreateStaffPositionDto) => {

        await createStaffPositions(data)
            .then((response) => {
                if (response.success) {
                    toast.success("Staff Position successfully created!")
                    reset()
                    updateTable()
                    setOpen(false)
                } else {
                    toast.error("Error creating staff position")
                }
            })
            .catch(errors => {
                handleFormApiErrors<FormFields>(errors,
                    setError,
                    Object.keys(schema.shape),
                    "Failed To Create Staff position",
                )
            })
    }

    const onUpdateStaffPosition = async (data: UpdateStaffPositionDto) => {


        await updateStaffPositions(data)
            .then((response) => {
                if (response.success) {
                    toast.success("Staff position successfully updated!")
                    updateTable()
                    setOpen(false)
                } else {
                    toast.error("Error updating staff position")
                }
            })
            .catch(errors => {
                handleFormApiErrors<FormFields>(errors,
                    setError,
                    Object.keys(schema.shape),
                    "Failed To Update Staff Position",
                )
            })

    }


    const onSubmit: SubmitHandler<FormFields> = async (data) => {

        if (dto) {
            await onUpdateStaffPosition(
                {...data, id: dto.id, updatedBy: Number(authenticatedUser)}
            )
            return
        } else {
            await onCreateStaffPosition(
                {...data, createdBy: Number(authenticatedUser)}
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
                                <Users
                                    size={16}
                                />
                                Add Staff Position
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
                            Staff Position
                        </h1>
                    </DialogTitle>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="w-full flex flex-col gap-[1rem] items-center justify-center"
                >
                    <FormTextInput<FormFields>
                        label="Name"
                        required={true}
                        placeholder="Enter Staff Position name"
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

export default StaffPositionsFormDialog;
