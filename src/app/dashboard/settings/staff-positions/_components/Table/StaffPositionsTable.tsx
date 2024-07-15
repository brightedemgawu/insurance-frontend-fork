"use client"

import {useEffect, useState} from "react";
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
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {userMeetsRequiredPermissions} from "@/lib/utils";
import {MANAGE_STAFF_POSITIONS_PERMISSION} from "@/types/authentication/access-level-permissions";
import {StaffPositionsReadDto} from "@/services/staff-positions/dto/response/StaffPositionsReadDto";
import SortableTableHeader from "@/components/Tables/SortableTableHeader";
import UserAvatar from "@/components/Auth/UserAvatar";
import CustomTooltip from "@/components/CustomTooltip";
import {Trash2} from "lucide-react";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import {useReactTable} from "@tanstack/react-table";
import AccessLevelTableFilter from "@/app/dashboard/settings/access-level/_components/Table/AccessLevelTableFilter";
import CustomTable from "@/components/Tables/CustomTable";
import Pagination from "@/components/Tables/Pagination";
import {handleApiErrors} from "@/lib/handleApiErrors";
import useStaffPositionsService from "@/services/staff-positions/useStaffPositionsService";
import StaffPositionsFormDialog from "@/app/dashboard/settings/staff-positions/_components/StaffPositionsFormDialog";
import {toast} from "sonner";

interface StaffPositionTableProps {
}

const TABLE_LIMIT = 7;

const StaffPositionTable = ({}: StaffPositionTableProps) => {

    const authenticatedUser = useSelector((state: RootState) => state.auth.authenticatedUser);
    const [tableData, setTableData] = useState<StaffPositionsReadDto[]>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [sorting, setSorting] = useState<SortingState>([])

    const {getStaffPositions, deleteStaffPosition} = useStaffPositionsService()


    const fetchStaffPositions = async () => {
        await getStaffPositions()
            .then((data) => {
                setTableData(data.data!)
            })
            .catch(errors => {
                handleApiErrors(errors)
            })

    }


    const onDeleteAccessLevel = async (id: number) => {

        await deleteStaffPosition(id)
            .then(async (response) => {
                if (!response.success) {
                    toast.error("Failed to staff position");
                    return;
                }
                toast.success(response.message)
                await fetchStaffPositions()
            })
            .catch((error) => handleApiErrors(error))

    }

    useEffect(() => {
        fetchStaffPositions().then()
    }, [])
    const [canAuthenticatedUserManageAccessLevel, setCanAuthenticatedUserManageAccessLevel] = useState<boolean>(false)

    useEffect(() => {

        if (authenticatedUser) {
            setCanAuthenticatedUserManageAccessLevel(userMeetsRequiredPermissions(authenticatedUser, [MANAGE_STAFF_POSITIONS_PERMISSION]))
        }

    }, [authenticatedUser]);

    const tableColumns: ColumnDef<StaffPositionsReadDto>[] = [
        {
            accessorKey: "name",
            header: ({column}) => {
                return (
                    <SortableTableHeader
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Name
                    </SortableTableHeader>
                )
            },
            cell: ({row}) => {
                const data = row.original
                return (
                    <p
                        className={"w-[250px]"}
                    >{data.name}</p>
                )
            }
        },
        {
            id: "users",
            header: "Users",
            cell: ({row}) => {
                const data = row.original
                return (
                    <div
                        className="flex -space-x-4 rtl:space-x-reverse w-[250px] "
                    >
                        {
                            data.users.slice(0, 5).map((user, index) => {
                                return (
                                    <UserAvatar
                                        key={index}
                                        className={"border-2 border-gray-white"}
                                        disableBeep user={user}/>
                                )
                            })
                        }

                        {data.users.length > 5 &&
                            <button
                                className="relative flex items-center justify-center size-[45px] text-xs font-medium text-gray-white bg-gray-700 border-2 border-gray-white rounded-full hover:bg-gray-600"
                            >
                                +{data.users.length - 5}
                            </button>
                        }

                    </div>
                )
            },
        },
        {
            accessorKey: "description",
            header: "Description",
            cell: ({row}) => {
                const data = row.original.description;

                return (
                    <div
                        className={"w-[160px]"}
                    >
                        {
                            data.length <= 20
                                ?
                                <p>{data} </p>
                                :
                                <CustomTooltip tipContent={data}>
                                    <p> {`${data.slice(0, 20)}...`} </p>
                                </CustomTooltip>
                        }
                    </div>
                )

            }
        },
        {
            id: "actions",
            cell: ({row}) => {
                const data = row.original
                if (!canAuthenticatedUserManageAccessLevel) {
                    return;
                }
                return (
                    <div className="flex gap-2 items-center">
                        <CustomTooltip tipContent={"Edit"}>
                            <StaffPositionsFormDialog
                                dto={data}
                                authenticatedUser={authenticatedUser!.id.toString()}
                                updateTable={async () => {
                                    await fetchStaffPositions()
                                }}
                            />
                        </CustomTooltip>

                        <ConfirmationDialog
                            heading={"Delete Access Level"}
                            trigger={
                                <CustomTooltip tipContent={"Delete"}>
                                    <Trash2
                                        size={20}
                                        className={" h-4 w-4 text-error-text cursor-pointer "}
                                    />
                                </CustomTooltip>
                            }
                            OnAction={async () => {
                                await onDeleteAccessLevel(Number(data.id))
                            }}>
                            <p
                                className={"text-[.9rem]"}
                            >
                                Are you sure you want to delete {""}
                                <span
                                    className={"font-bold"}
                                >
                                    {data.name}?
                                </span>

                                <br/>
                                This action cannot be undone.
                            </p>
                        </ConfirmationDialog>

                    </div>
                )
            }
        }
    ]

    const table: Table<StaffPositionsReadDto> = useReactTable({
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
                pageSize: TABLE_LIMIT
            }
        }
    })

    return (
        <div
            className={"w-full"}
        >
            <div
                className={"w-full flex justify-between items-center"}
            >
                <p
                    className={"text-gray-black font-medium text-[.9rem] md:text-[1.1rem]"}
                >
                    Staff Positions{" "}
                    <span
                        className={"text-gray-700"}
                    >
                        ({table.getPrePaginationRowModel().rows.length})
                    </span>
                </p>

                {canAuthenticatedUserManageAccessLevel &&
                    <StaffPositionsFormDialog
                        authenticatedUser={authenticatedUser!.id.toString()}
                        updateTable={async () => {
                            await fetchStaffPositions()
                        }}
                    />
                }
            </div>
            <AccessLevelTableFilter table={table}/>
            <CustomTable table={table} columns={tableColumns}/>
            <Pagination table={table}/>
        </div>

    )
}

export default StaffPositionTable;
