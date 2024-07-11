"use client"

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
import {useEffect, useState} from "react";
import AccessLevelTableFilter from "@/app/dashboard/settings/access-level/_components/Table/AccessLevelTableFilter";
import CustomTable from "@/components/Tables/CustomTable";
import Pagination from "@/components/Tables/Pagination";
import {ReadAccessLevelDto} from "@/services/access-levels/dtos/response/ReadAccessLevelDto";
import CustomTooltip from "@/components/CustomTooltip";
import UserAvatar from "@/components/Auth/UserAvatar";
import useAccessLevelService from "@/services/access-levels/useAccessLevelService";
import {handleApiErrors} from "@/lib/handleApiErrors";
import {FilePenLine, LockKeyhole, Trash2} from "lucide-react";
import Link from "next/link";
import {useSelector} from "react-redux";
import {RootState} from "@/store/store";
import {cn, userMeetsRequiredPermissions} from "@/lib/utils";
import {buttonStyleVariants} from "@/components/Button/buttonStyleVariants";
import SortableTableHeader from "@/components/Tables/SortableTableHeader";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import {toast} from "sonner";
import {MANAGE_ACCESS_LEVELS_PERMISSION} from "@/types/authentication/access-level-permissions";


const TABLE_LIMIT = 7;

export default function AccessLevelTable() {
    const authenticatedUser = useSelector((state: RootState) => state.auth.authenticatedUser);
    const {getAccessLevels, deleteAccessLevel} = useAccessLevelService()

    const [tableData, setTableData] = useState<ReadAccessLevelDto[]>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [sorting, setSorting] = useState<SortingState>([])
    const fetchAccessLevels = async () => {
        await getAccessLevels()
            .then((data) => {
                setTableData(data.data!)
            })
            .catch(errors => {
                handleApiErrors(errors)
            })

    }
    const onDeleteAccessLevel = async (id: number) => {

        await deleteAccessLevel(id)
            .then(async (response) => {
                if (!response.success) {
                    toast.error("Failed to delete access level");
                    return;
                }
                toast.success(response.message)
                await fetchAccessLevels()
            })
            .catch((error) => handleApiErrors(error))

    }

    const [canAuthenticatedUserManageAccessLevel, setCanAuthenticatedUserManageAccessLevel] = useState<boolean>(false)


    useEffect(() => {

        if (authenticatedUser) {
            setCanAuthenticatedUserManageAccessLevel(userMeetsRequiredPermissions(authenticatedUser, [MANAGE_ACCESS_LEVELS_PERMISSION]))
        }

    }, [authenticatedUser]);


    const tableColumns: ColumnDef<ReadAccessLevelDto>[] = [
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
                            <Link
                                href={`/dashboard/settings/access-level/${data.id}`}
                            >
                                <FilePenLine
                                    size={20}
                                    className={" h-4 w-4 text-gray-text-caption cursor-pointer "}
                                />
                            </Link>
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
                                await onDeleteAccessLevel(data.id)
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


    const table: Table<ReadAccessLevelDto> = useReactTable({
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

    useEffect(() => {
        fetchAccessLevels().then()
    }, [])


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
                    Access Levels {" "}
                    <span
                        className={"text-gray-700"}
                    >
                        ({table.getPrePaginationRowModel().rows.length})
                    </span>
                </p>

                {canAuthenticatedUserManageAccessLevel &&
                    <Link
                        className={cn(buttonStyleVariants({className: "text-[.8rem]"}))}
                        href={"/dashboard/settings/access-level/create"}>
                        <LockKeyhole
                            size={16}
                        />
                        Create Access Level
                    </Link>
                }
            </div>
            <AccessLevelTableFilter table={table}/>
            <CustomTable table={table} columns={tableColumns}/>
            <Pagination table={table}/>
        </div>
    )
}
