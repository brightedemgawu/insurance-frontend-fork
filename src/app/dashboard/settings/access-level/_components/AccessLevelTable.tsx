"use client"

import {
    ColumnDef,
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    Table
} from "@tanstack/table-core";
import {useReactTable} from "@tanstack/react-table";
import {useEffect, useState} from "react";
import AccessLevelTableFilter from "@/app/dashboard/settings/access-level/_components/AccessLevelTableFilter";
import CustomTable from "@/components/Tables/CustomTable";
import Pagination from "@/components/Tables/Pagination";
import {ReadAccessLevelDto} from "@/services/access-levels/dtos/response/ReadAccessLevelDto";
import CustomTooltip from "@/components/CustomTooltip";
import UserAvatar from "@/components/Auth/UserAvatar";
import useAccessLevelService from "@/services/access-levels/useAccessLevelService";
import {handleApiErrors} from "@/lib/handleApiErrors";


const LIMIT = 5;

export default function AccessLevelTable() {
    const usersColumns: ColumnDef<ReadAccessLevelDto>[] = [
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            id: "users",
            header: "Users",
            cell: ({row}) => {
                const data = row.original
                // const user: { email: string, imageUrl?: string } = {email: "ebright@gmail.com"}
                return (
                    <div
                        className="flex -space-x-4 rtl:space-x-reverse"
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
                                {data.users.length - 5}
                            </button>
                        }

                    </div>
                )
            }
        },
        {
            accessorKey: "description",
            header: "Description",
            cell: ({row}) => {
                const data = row.original.description;
                if (data.length <= 20) {
                    return (<p>{data}</p>)
                }
                return (
                    <CustomTooltip tipContent={data}>
                        <p>{data.slice(0, 20)}...</p>
                    </CustomTooltip>
                )

            }
        },

    ]

    const [tableData, setTableData] = useState<ReadAccessLevelDto[]>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )

    const table: Table<ReadAccessLevelDto> = useReactTable({
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

    const {getAccessLevels} = useAccessLevelService()

    useEffect(() => {

        const fetchAccessLevels = async () => {
            await getAccessLevels()
                .then((data) => {
                    setTableData(data.data!)
                })
                .catch(errors => {
                    handleApiErrors(errors)
                })

        }

        fetchAccessLevels().then()

    }, [])


    return (
        <div
            className={"w-full"}
        >
            <AccessLevelTableFilter table={table}/>
            <CustomTable table={table} columns={usersColumns}/>
            <Pagination table={table}/>
        </div>
    )
}
