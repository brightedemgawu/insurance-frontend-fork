"use client"

import {useEffect, useState} from "react";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import AppButton from "@/components/Button/AppButton";
import {useRouter} from "next/navigation";
import {Progress} from "@/components/ui/progress";
import {CreateAccessLevelDto} from "@/services/access-levels/dtos/request/CreateAccessLevelDto";
import useAccessLevelService from "@/services/access-levels/useAccessLevelService";
import BasicInformationForm from "@/app/dashboard/settings/access-level/_components/Forms/BasicInformationForm";
import SelectAccessLevelPermissions
    from "@/app/dashboard/settings/access-level/_components/Forms/SelectAccessLevelPermissionsForm";
import {initializePermissions} from "@/types/authentication/access-level-permissions";
import AssignUserForm from "@/app/dashboard/settings/access-level/_components/Forms/AssignUserForm";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {toast} from "sonner";
import {handleApiErrors} from "@/lib/handleApiErrors";
import {UpdateAccessLevelDto} from "@/services/access-levels/dtos/request/UpdateAccessLevelDto";

interface CreateUpdateAccessLevelProps {
    id?: string;
}

const TOTAL_STEPS = 3;

const CreateUpdateAccessLevel = ({id}: CreateUpdateAccessLevelProps) => {

    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(1);
    const [dto, setDto] = useState<CreateAccessLevelDto>(
        {permissions: initializePermissions()}
    );
    const authenticatedUser = useSelector((state: RootState) => state.auth.authenticatedUser);

    const {getAccessLevel} = useAccessLevelService()
    const {createAccessLevel, updateAccessLevel} = useAccessLevelService()

    /**
     * Handles creation of access level.
     * @param dto - Data transfer object for access level creation.
     */
    const onCreateAccessLevel = async (dto: CreateAccessLevelDto) => {
        dto.createdBy = authenticatedUser!.id;
        await createAccessLevel(dto)
            .then((response) => {

                if (response.success) {
                    toast.success("Access level created successfully.");
                    router.push("/dashboard/settings/access-level")
                } else {
                    toast.error("Failed to create access level");
                }

            })
            .catch((error) => {
                handleApiErrors(error)
            })
    }

    const onUpdateAccessLevel = async (dto: CreateAccessLevelDto) => {

        let newDto: UpdateAccessLevelDto = {
            ...dto,
            id: Number(id!),
            name: dto.name!,
            updatedBy: authenticatedUser!.id
        }
        await updateAccessLevel(newDto)
            .then((response) => {

                if (response.success) {
                    toast.success("Access level updated successfully.");
                    router.push("/dashboard/settings/access-level")
                } else {
                    toast.error("Failed to update access level");
                }

            })
            .catch((error) => {
                handleApiErrors(error)
            })
    }

    const onSubmit = async (dto: CreateAccessLevelDto) => {
        if (id) {
            await onUpdateAccessLevel(dto);
            return
        }
        await onCreateAccessLevel(dto)

    }
    const onNextTab = (value: CreateAccessLevelDto) => {
        setDto(value)
        setCurrentStep(currentStep + 1);
    }

    const onPreviousTab = (value?: CreateAccessLevelDto) => {
        value && setDto(value)
        setCurrentStep(currentStep - 1);
    }

    useEffect(() => {
        const fetchAccessLevel = async () => {
            await getAccessLevel(Number(id))
                .then((response) => {
                    if (response.success) {
                        const data = response.data!;
                        setDto({
                            ...data,
                            assignedUsers: data.users.map((user) => user.email),
                        } as CreateAccessLevelDto)
                    }
                })
        }

        if (id) {
            fetchAccessLevel().then();
        }
    }, [])

    /**
     * Renders step content based on current step.
     * @returns JSX element representing current step content.
     */
    const renderStepContent = () => {

        switch (currentStep) {
            case 1:
                return <BasicInformationForm dto={dto} onNextTab={onNextTab}/>
            case 2:
                return <SelectAccessLevelPermissions dto={dto} onNextTab={onNextTab} onPreviousTab={onPreviousTab}/>
            case 3:
                return <AssignUserForm id={id} dto={dto} onPreviousTab={onPreviousTab} onSubmit={onSubmit}/>
        }
    }

    return (

        <div
            className={"w-full rounded-md bg-gray-white"}
        >
            <div
                className={"w-full px-4 md:px-8 flex items-center justify-between"}
            >
                <div
                    className={"flex h-full gap-4  w-fit items-center"}
                >
                    <h1
                        className={"text-gray-text text-[.9rem] md:text-[1.2rem] border-r-[1px] pr-4 py-4 border-gray-200 font-medium"}
                    >
                        {id ? "Edit Access level" : "Create Access level"}
                    </h1>

                    <p
                        className={"text-[.8rem] md:text-[1rem] font-medium text-gray-800"}
                    >Step {currentStep} of {TOTAL_STEPS}</p>
                </div>
                <ConfirmationDialog
                    heading={`Cancel ${id ? "Editing" : "Creating"} Access Level.`}
                    trigger={
                        <AppButton>
                            Cancel
                        </AppButton>
                    }
                    OnAction={async () => {
                        router.push("/dashboard/settings/access-level")
                    }}>
                    Are you sure you want to cancel?
                </ConfirmationDialog>
            </div>
            <Progress
                value={(currentStep / TOTAL_STEPS) * 100}
            />
            <div
                className={"w-full p-4 md:px-8"}
            >
                <p
                    className={"text-gray-700 text-[.9rem]"}
                >
                    Control your employees access to information, {id ? "edit" : "create an"} access level and attaching
                    permissions
                    to it
                </p>

                <div
                    className={"w-full md:w-[60%] 2xl:w-[40%] my-4"}
                >
                    {renderStepContent()}
                </div>

            </div>
        </div>
    )
}

export default CreateUpdateAccessLevel;
