"use client"

import {CreateAccessLevelDto} from "@/services/access-levels/dtos/request/CreateAccessLevelDto";
import {cn, convertToTitleCase} from "@/lib/utils";
import {useState} from "react";
import {AccessLevelPermissions} from "@/types/authentication";
import {Switch} from "@/components/ui/switch";
import ActionButton from "@/components/Button/ActionButton";
import {Separator} from "@/components/ui/separator";


const PermissionTabs: string[] = ["Settings", "Employees"]

const SettingsPermission = {
    "view_access_levels": false,
    "manage_access_levels": false,
    "view_settings": false
}

const SettingsList = ["view_settings", "view_access_levels", "manage_access_levels",]

const EmployeePermission = {
    "view_users": false,
    "manage_users": false
}

const EmployeeList = [
    "view_users",
    "manage_users"
]

export default function ChoosePermissionsForm({goBack, dto, onSubmitData}: {
    dto: CreateAccessLevelDto,
    onSubmitData: (value: CreateAccessLevelDto) => Promise<void>,
    goBack: () => void
}) {

    const [tab, setTap] = useState<number>(0);

    const [permissions, setPermissions] = useState({
        ...SettingsPermission, ...EmployeePermission, ...dto.permissions,
        "view_dashboard": true
    })


    const renderTap = () => {

        switch (tab) {
            case 0:
                return (
                    SettingsList.map((ta: string, index) => {
                        return (
                            <div
                                key={index}
                                className={"w-full flex items-center justify-between my-4 border-[1px] border-gray-300 rounded-lg py-3 px-6 "}
                            >
                                <p
                                    className={"text-[.9rem] text-gray-black"}
                                >{convertToTitleCase(ta)}</p>
                                <Switch
                                    checked={permissions[ta as keyof AccessLevelPermissions]}
                                    onCheckedChange={(value) => {
                                        setPermissions((prevState) =>
                                            ({
                                                ...prevState,
                                                [ta]: value
                                            }))
                                    }}
                                />
                            </div>
                        )
                    })
                )

            case 1 :
                return (
                    EmployeeList.map((ta: string, index) => {
                        return (
                            <div
                                key={index}
                                className={"w-full flex items-center justify-between my-4 border-[1px] border-gray-300 rounded-lg py-3 px-6 "}
                            >
                                <p
                                    className={"text-[.9rem] text-gray-black"}
                                >{convertToTitleCase(ta)}</p>
                                <Switch
                                    checked={permissions[ta as keyof AccessLevelPermissions]}
                                    onCheckedChange={(value) => {
                                        setPermissions((prevState) =>
                                            ({
                                                ...prevState,
                                                [ta]: value
                                            }))
                                    }}
                                />
                            </div>
                        )
                    })
                )
        }

    }

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
                                onClick={() => setTap(index)}
                                className={
                                    cn(
                                        ["min-w-fit text-gray-text tracking-wider text-[.9rem] bg-gray-200/50 px-6",
                                            "hover:text-primary-text flex items-center h-[40px] "],
                                        {
                                            "text-primary-text bg-gray-white border-b-[2px] font-medium border-primary-border": tab === index,
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
                className={"w-full mt-6"}
            >

                <div className={"w-full"}>
                    {renderTap()}
                </div>
            </div>

            <div
                className={"w-full mt-4 flex gap-4"}
            >
                <ActionButton
                    onClick={() => {
                        goBack()
                    }}
                    className={"py-2"}
                    type={"button"}>
                    PREVIOUS
                </ActionButton>
                <ActionButton
                    onClick={async () => {
                        dto.permissions = permissions
                        await onSubmitData(dto)
                    }}
                    className={"py-2"}
                    type={"button"}>
                    SUBMIT
                </ActionButton>
            </div>
        </div>
    )
}
