"use client"

import {useState} from "react";
import {Progress} from "@/components/ui/progress";
import AppButton from "@/components/Button/AppButton";
import BasicInfoForm from "@/app/dashboard/settings/access-level/create/_components/BasicInfoForm";
import {CreateAccessLevelDto} from "@/services/access-levels/dtos/request/CreateAccessLevelDto";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
import ChoosePermissionsForm from "@/app/dashboard/settings/access-level/create/_components/ChoosePermissionsForm";
import useAccessLevelService from "@/services/access-levels/useAccessLevelService";
import {handleApiErrors} from "@/lib/handleApiErrors";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import ConfirmationDialog from "@/components/ConfirmationDialog";

const TOTAL_STEPS = 2;

export default function Page() {
    const [currentStep, setCurrentStep] = useState(1);
    const [accessLevelDto, setAccessLevelDto] = useState<CreateAccessLevelDto>({});
    const authUser = useSelector((state: RootState) => state.auth.authenticatedUser);

    const {createAccessLevel} = useAccessLevelService()

    const router = useRouter()

    const onCreateAccessLevel = async (dto: CreateAccessLevelDto) => {

        dto.createdBy = authUser!.id;
        dto.assignedUsers = []

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


    const renderStepContent = () => {

        switch (currentStep) {
            case 1:
                return <BasicInfoForm
                    dto={accessLevelDto}
                    onChangeTap={(value: CreateAccessLevelDto) => {
                        setAccessLevelDto(value)
                        setCurrentStep(currentStep + 1);
                    }}
                />;
            case 2:
                return <ChoosePermissionsForm
                    dto={accessLevelDto}
                    goBack={() => setCurrentStep(currentStep - 1)}
                    onSubmitData={onCreateAccessLevel}
                />;
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
                        Create Access level
                    </h1>

                    <p
                        className={"text-[.8rem] md:text-[1rem] font-medium text-gray-800"}
                    >Step {currentStep} of {TOTAL_STEPS}</p>
                </div>

                <ConfirmationDialog
                    heading={"Cancel Access Level Creation"}
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
                    Control your employees access to information, create an access level and attaching permissions
                    to it
                </p>

                <div
                    className={"w-full md:w-[50%] my-4"}
                >
                    {renderStepContent()}
                </div>

            </div>

        </div>
    )
}
