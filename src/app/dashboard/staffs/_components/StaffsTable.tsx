"use client"

import {useEffect, useState} from "react";
import {EmployeeReadDto} from "@/services/users/dto/Response/EmployeeReadDto";
import {handleApiErrors} from "@/lib/handleApiErrors";
import useUsersService from "@/services/users/useUsersService";
import {
    ColumnDef,
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    Table
} from "@tanstack/table-core";
import {useReactTable} from "@tanstack/react-table";
import CustomTable from "@/components/Tables/CustomTable";
import Pagination from "@/components/Tables/Pagination";
import StaffTableFilter from "@/app/dashboard/staffs/_components/StaffTableFilter";
import UserAvatarWithDetails from "@/components/Auth/UserAvatarWithDetails";
import StaffFormDialog from "@/app/dashboard/staffs/_components/StaffFormDialog";
import {convertDateToMonthDayYear} from "@/lib/utils";
import useAccessLevelService from "@/services/access-levels/useAccessLevelService";
import {ReadAccessLevelDto} from "@/services/access-levels/dtos/response/ReadAccessLevelDto";
import {CaretSortIcon} from "@radix-ui/react-icons";
import AppButton from "@/components/Button/AppButton";

const LIMIT = 5

export default function StaffsTable() {
    const [sorting, setSorting] = useState<SortingState>([])
    const usersColumns: ColumnDef<EmployeeReadDto>[] = [
        {
            accessorKey: "email",
            header: ({column}) => {
                return (
                    <AppButton
                        variant={"link"}
                        className={"p-0 gap-1 font-medium hover:text-gray-text focus:ring-0 "}
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Email
                        <CaretSortIcon className=" h-4 w-4"/>
                    </AppButton>
                )
            },
            cell: ({row}) => {
                const staff = row.original

                return (
                    <div
                        className={"w-[250px] overflow-hidden "}
                    >
                        <UserAvatarWithDetails
                            nameClassName={"text-[.8rem]"}
                            disableBeep
                            user={staff}
                        />
                    </div>
                )

            }
        },
        {
            accessorKey: "employeeInfo",
            header: "Phone",
            cell: ({row}) => {
                const staff = row.original
                return <p
                    className={"w-[150px] text-[.9rem] "}
                >
                    {
                        staff && staff.employeeInfo && staff.employeeInfo.phone ? `+${staff.employeeInfo.phone}` : "NaN"
                    }
                </p>


            }
        },
        {
            accessorKey: "active",
            header: "Status",
            cell: ({row}) => {
                const user = row.original;
                if (user.active) {
                    return (<p
                        className={"w-fit  italic py-2 px-4 text-[.8rem] text-center rounded-md bg-success-100"}
                    >Active</p>)
                }
                return (<p
                    className={"w-fit px-4 py-2 italic text-center text-[.8rem] rounded-md bg-error-100"}
                >Archived</p>)
            }
        },
        {
            accessorKey: "updatedAt",
            header: ({column}) => {
                return (
                    <AppButton variant={"link"}
                               className={"p-0 gap-1 font-medium hover:text-gray-text focus:ring-0 "}
                               onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Updated At
                        <CaretSortIcon className=" h-4 w-4"/>
                    </AppButton>
                )
            },

            cell: ({row}) => {
                const user = row.original;
                return (
                    <p
                        className={"w-[120px]"}
                    >{convertDateToMonthDayYear(user.updatedAt?.toString() ?? "")}</p>
                )
            }
        },
        {
            accessorKey: "createdAt",
            header: ({column}) => {
                return (
                    <AppButton variant={"link"}
                               className={"p-0 gap-1 font-medium hover:text-gray-text focus:ring-0 "}
                               onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Created At
                        <CaretSortIcon className=" h-4 w-4"/>
                    </AppButton>
                )
            },
            cell: ({row}) => {
                const user = row.original;
                return (
                    <p
                        className={"w-[120px]"}
                    >{convertDateToMonthDayYear(user.createdAt.toString())}</p>
                )
            }
        },

    ]

    const [tableData, setTableData] = useState<EmployeeReadDto[]>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )

    const table: Table<EmployeeReadDto> = useReactTable({
        data: tableData,
        columns: usersColumns,
        getCoreRowModel: getCoreRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        state: {
            columnFilters,
            sorting,
        },
        initialState: {
            pagination: {
                pageSize: LIMIT
            }
        }
    })
    const {getEmployees} = useUsersService()
    console.log(table.getState().sorting)
    const fetchEmployees = async () => {
        await getEmployees()
            .then((data) => {
                setTableData(data.data!)
            })
            .catch(errors => {
                handleApiErrors(errors)
            })
    }
    useEffect(() => {
        fetchEmployees().then()
    }, [])

    const {getAccessLevels} = useAccessLevelService()

    const [accessLevels, setAccessLevels] = useState<ReadAccessLevelDto[]>([])

    useEffect(() => {
        const fetchAccessLevels = async () => {
            await getAccessLevels()
                .then((data) => {
                    setAccessLevels(data.data!)
                })
                .catch(errors => {
                    handleApiErrors(errors)
                })

        }
        fetchAccessLevels().then()
    }, [])

    return (
        <div
            className={"w-full md:p-6"}
        >

            <div
                className={"w-full my-2 flex items-center justify-between"}
            >
                <h5
                    className={"text-[1.5rem] font-bold text-gray-text"}
                >
                    Staffs
                </h5>

                <StaffFormDialog accessLevels={accessLevels} updateTable={fetchEmployees}/>
            </div>
            <div
                className={"w-full my-6 py-8 px-6 bg-gray-white rounded-md"}
            >
                <StaffTableFilter table={table}/>
                <CustomTable table={table} columns={usersColumns}/>
                <Pagination table={table}/>
            </div>
        </div>
    )


}
