import {CreateAccessLevelDto} from "@/services/access-levels/dtos/request/CreateAccessLevelDto";
import {useState} from "react";
import {Separator} from "@/components/ui/separator";
import ActionButton from "@/components/Button/ActionButton";
import {
    AccessLevelPermissions,
    DashboardSettingsPermissions,
    StaffPermissions
} from "@/types/authentication/access-level-permissions";
import {cn, convertToTitleCase} from "@/lib/utils";
import {Switch} from "@/components/ui/switch";

interface SelectAccessLevelPermissionsProps {
    dto: CreateAccessLevelDto,
    onNextTab: (value: CreateAccessLevelDto) => void,
    onPreviousTab: (value: CreateAccessLevelDto) => void
}


const PermissionTabs: string[] = ["Settings", "Staffs"]

const SelectAccessLevelPermissions = ({
                                          dto,
                                          onNextTab,
                                          onPreviousTab
                                      }: SelectAccessLevelPermissionsProps) => {

    const [currentTab, setCurrentTap] = useState<number>(0);

    const [permissions, setPermissions] = useState<AccessLevelPermissions>({
        ...dto.permissions!,
    })


    /**
     * Renders permissions based on the selected tab.
     * @returns JSX elements representing permissions for the selected tab.
     */
    const renderTabPermissions = () => {
        const selectedPermissions = currentTab === 0 ? DashboardSettingsPermissions : StaffPermissions;

        return selectedPermissions.map((permission: string, index) => (
            <div
                key={index}
                className="w-full flex items-center justify-between my-4 border-[1px] border-gray-300 rounded-lg py-3 px-6"
            >
                <p className="text-[.9rem] text-gray-black">{convertToTitleCase(permission)}</p>
                <Switch
                    checked={permissions[permission as keyof AccessLevelPermissions]}
                    onCheckedChange={(value) => {
                        setPermissions((prevPermissions: any) => ({
                            ...prevPermissions,
                            [permission]: value
                        }));
                    }}
                />
            </div>
        ));
    };

    return (
        <div
            className={"w-full"}
        >
            <h4
                className={"text-gray-text text-[1.3rem] font-medium"}
            >Choose Permissions</h4>
            <Separator className={"my-2"}/>
            <div
                className={"w-full my-4 flex no-scrollbar items-center max-w-full overflow-y-hidden overflow-x-scroll "}
            >
                {
                    PermissionTabs.map((link, index) => {
                        return (
                            <button
                                onClick={() => setCurrentTap(index)}
                                className={
                                    cn(
                                        ["min-w-fit text-gray-text tracking-wider text-[.9rem] bg-gray-200/50 px-6",
                                            "hover:text-primary-text flex items-center h-[40px] "],
                                        {
                                            "text-primary-text bg-gray-white border-b-[2px] font-medium border-primary-border": currentTab === index,
                                        }
                                    )
                                }
                                key={index}
                            >
                                {link}
                            </button>
                        )
                    })
                }

            </div>


            <div
                className={"w-full min-h-[250px] mt-6"}
            >
                {renderTabPermissions()}
            </div>

            <div
                className={"w-full mt-4 flex gap-4"}
            >
                <ActionButton
                    onClick={() => {
                        dto.permissions = permissions
                        onPreviousTab(dto)
                    }}
                    className={"py-2"}
                    type={"button"}>
                    PREVIOUS
                </ActionButton>
                <ActionButton
                    onClick={() => {
                        dto.permissions = permissions
                        onNextTab(dto)
                    }}
                    className={"py-2"}
                    type={"button"}>
                    CONTINUE
                </ActionButton>
            </div>
        </div>
    )
}

export default SelectAccessLevelPermissions;
