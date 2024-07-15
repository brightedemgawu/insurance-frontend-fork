"use client"

import {Table} from "@tanstack/table-core";
import AppTextInput from "@/components/Form/Inputs/AppTextInput/AppTextInput";
import {Filter, Search} from "lucide-react";
import debounce from "lodash/debounce";
import AppButton from "@/components/Button/AppButton";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {useState} from "react";
import {Checkbox} from "@/components/ui/checkbox";

interface StaffTableFilterProps<TData> {
    table: Table<TData>;
}


export default function StaffTableFilter<TData>({table}: StaffTableFilterProps<TData>) {

    const [activeUsers, setActiveUsers] = useState<boolean>(false)
    const [archivedUsers, setArchivedUsers] = useState<boolean>(false)

    const handleSearchByEmail = debounce((value: string) => {
        table.getColumn("email")?.setFilterValue(value)
    }, 300)

    const resetFilters = () => {
        setActiveUsers(false)
        setArchivedUsers(false)
    }

    const applyFilter = () => {
        let state: boolean | null = null

        if (activeUsers && archivedUsers) {
        } else if (!activeUsers && !archivedUsers) {

        } else if (archivedUsers) {
            state = false
        } else {
            state = true
        }

        table.getColumn("active")?.setFilterValue(state);
    }

    return (

        <div
            className={"w-full mb-6  flex justify-between items-center"}
        >
            <div
                className={"flex items-center gap-4"}
            >
                <AppTextInput
                    placeholder="Filter by email..."
                    className={"w-[100px] h-[40px] md:w-[400px] "}
                    name={"Search"}
                    Icon={Search}
                    onChange={async (value) => {
                        handleSearchByEmail(value)
                    }}/>


                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div>
                            <AppButton
                                variant={"light"}
                                className={"h-[40px] text-gray-800 border-gray-400 text-[.9rem] shadow-sm "}
                            >
                                <Filter
                                    size={18}
                                    className={"text-gray-400"}
                                />
                                Filter
                            </AppButton>
                        </div>

                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="ml-[30%] w-[250px] drop-shadow-lg p-4  bg-gray-white">
                        <div
                            className={"w-full flex justify-between items-center "}
                        >
                            <div
                                className="flex items-center gap-6 text-[.9rem] text-gray-text"
                            >
                                <Checkbox
                                    checked={archivedUsers && activeUsers}
                                    onCheckedChange={(state: boolean) => {
                                        setActiveUsers(state)
                                        setArchivedUsers(state)
                                    }}
                                />
                                Select All
                            </div>
                            <AppButton
                                variant={"link"}
                                onClick={resetFilters}
                                className={"p-0 focus:ring-0 text-error-text hover:text-error-700 "}
                            >
                                Clear
                            </AppButton>
                        </div>
                        <DropdownMenuSeparator className={"my-5"}/>
                        <div
                            className={"w-full flex flex-col gap-5"}
                        >
                            <div
                                className="flex items-center  gap-6 text-[.9rem] text-gray-text"
                            >
                                <Checkbox
                                    checked={activeUsers}
                                    onCheckedChange={(state: boolean) => {
                                        setActiveUsers(state)
                                    }}
                                />
                                Active
                            </div>

                            <div
                                className="flex items-center gap-6 text-[.9rem] text-gray-text"
                            >
                                <Checkbox
                                    checked={archivedUsers}
                                    onCheckedChange={(state: boolean) => {
                                        setArchivedUsers(state)
                                    }}
                                />
                                Archived
                            </div>
                        </div>
                        <DropdownMenuSeparator className={"my-5"}/>
                        <div
                            className={"w-full flex items-center justify-between"}
                        >
                            <DropdownMenuItem
                                className={"w-[48%] p-0"}
                            >

                                <AppButton
                                    variant={"destructive"}
                                    className={"w-full text-[.8rem] bg-gray-white text-error-text border-error-border hover:bg-gray-white border-[1px] "}
                                    onClick={resetFilters}
                                >
                                    Cancel
                                </AppButton>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className={"w-[48%] p-0"}
                            >
                                <AppButton
                                    onClick={applyFilter}
                                    className={"w-[100%] text-[.8rem] "}
                                >
                                    Apply
                                </AppButton>
                            </DropdownMenuItem>

                        </div>
                    </DropdownMenuContent>

                </DropdownMenu>

            </div>
        </div>
    )
}
