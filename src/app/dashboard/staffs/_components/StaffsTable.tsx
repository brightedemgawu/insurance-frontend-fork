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

const LIMIT = 10

export default function StaffsTable() {

    const usersColumns: ColumnDef<EmployeeReadDto>[] = [
        {
            accessorKey: "email",
            header: "Staff",
            cell: ({row}) => {
                const staff = row.original

                return (
                    <UserAvatarWithDetails
                        nameClassName={"text-[.8rem]"}
                        disableBeep
                        user={staff}
                    />
                )

            }
        },
        {
            accessorKey: "employeeInfo",
            header: "Phone",
            cell: ({row}) => {
                const staff = row.original
                if (staff && staff.employeeInfo) {
                    return (
                        <p>{staff.employeeInfo.phone ?
                            `+${staff.employeeInfo.phone}` :
                            "-"

                        }</p>
                    )
                }
                return (
                    "-"
                )

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
                >Deactivated</p>)
            }
        },
        {
            accessorKey: "updatedAt",
            header: "Updated At",
            cell: ({row}) => {
                const user = row.original;
                return (
                    <p>{convertDateToMonthDayYear(user.updatedAt?.toString() ?? "")}</p>
                )
            }
        },
        {
            accessorKey: "createdAt",
            header: "Created At",
            cell: ({row}) => {
                const user = row.original;
                return (
                    <p>{convertDateToMonthDayYear(user.createdAt.toString())}</p>
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
        state: {
            columnFilters,
        },
        initialState: {
            pagination: {
                pageSize: LIMIT
            }
        }
    })
    const {getEmployees} = useUsersService()

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
                className={"w-full my-6 p-4 bg-gray-white rounded-md"}
            >
                <StaffTableFilter table={table}/>
                <CustomTable table={table} columns={usersColumns}/>
                <Pagination table={table}/>
            </div>
        </div>
    )


}
