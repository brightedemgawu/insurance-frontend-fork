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
import {convertDateToMonthDayYear, userMeetsRequiredPermissions} from "@/lib/utils";
import useAccessLevelService from "@/services/access-levels/useAccessLevelService";
import {ReadAccessLevelDto} from "@/services/access-levels/dtos/response/ReadAccessLevelDto";
import SortableTableHeader from "@/components/Tables/SortableTableHeader";
import CustomTooltip from "@/components/CustomTooltip";
import {ArchiveX} from "lucide-react";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import {MANAGE_STAFFS_PERMISSION} from "@/types/authentication/access-level-permissions";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";

const LIMIT = 5

export default function StaffsTable() {
    const {getEmployees} = useUsersService()
    const {getAccessLevels} = useAccessLevelService()

    const [accessLevels, setAccessLevels] = useState<ReadAccessLevelDto[]>([])
    const [sorting, setSorting] = useState<SortingState>([])

    const authenticatedUser = useSelector((state: RootState) => state.auth.authenticatedUser);
    const [canAuthenticatedUserManageStaff, setCanAuthenticatedUserManageStaff] = useState<boolean>(false)


    useEffect(() => {

        if (authenticatedUser) {
            setCanAuthenticatedUserManageStaff(userMeetsRequiredPermissions(authenticatedUser, [MANAGE_STAFFS_PERMISSION]))
        }

    }, [authenticatedUser]);

    const tableColumns: ColumnDef<EmployeeReadDto>[] = [
        {
            accessorKey: "email",
            header: ({column}) => {
                return (
                    <SortableTableHeader
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Email
                    </SortableTableHeader>
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
                    <SortableTableHeader

                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Updated At
                    </SortableTableHeader>
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
                    <SortableTableHeader
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Created At
                    </SortableTableHeader>
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
        {
            id: "actions",
            cell: ({row}) => {
                const data = row.original
                if (!canAuthenticatedUserManageStaff) {
                    return;
                }
                return (
                    <div className="flex gap-2 items-center">
                        <CustomTooltip tipContent={"Edit"}>
                            <StaffFormDialog
                                dto={data}
                                authenticatedUser={authenticatedUser!.id}
                                accessLevels={accessLevels} updateTable={fetchEmployees}/>
                        </CustomTooltip>

                        <ConfirmationDialog
                            heading={"Archive Staff"}
                            trigger={
                                <CustomTooltip tipContent={"Archive"}>
                                    <ArchiveX
                                        size={20}
                                        className={" h-4 w-4 text-error-text cursor-pointer "}
                                    />
                                </CustomTooltip>
                            }
                            OnAction={async () => {

                            }}>
                            <p
                                className={"text-[.9rem]"}
                            >
                                Are you sure you want to archive {""}
                                <span
                                    className={"font-bold"}
                                >
                                    {data.name}?
                                </span>
                                <br/>
                            </p>
                        </ConfirmationDialog>

                    </div>
                )
            }
        }
    ]

    const [tableData, setTableData] = useState<EmployeeReadDto[]>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )
    const table: Table<EmployeeReadDto> = useReactTable({
        data: tableData,
        columns: tableColumns,
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
                    className={"text-[1.2rem] font-bold text-gray-text"}
                >
                    Staffs{" "}
                    <span
                        className={"text-gray-700"}
                    >
                        ({table.getPrePaginationRowModel().rows.length})
                    </span></h5>

                {canAuthenticatedUserManageStaff &&
                    <StaffFormDialog
                        authenticatedUser={authenticatedUser!.id}
                        accessLevels={accessLevels} updateTable={fetchEmployees}/>
                }
            </div>
            <div
                className={"w-full my-6 py-8 px-6 bg-gray-white rounded-md"}
            >
                <StaffTableFilter table={table}/>
                <CustomTable table={table} columns={tableColumns}/>
                <Pagination table={table}/>
            </div>
        </div>
    )


}
