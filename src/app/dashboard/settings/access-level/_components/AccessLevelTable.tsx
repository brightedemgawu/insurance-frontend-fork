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
import {useState} from "react";
import AccessLevelTableFilter from "@/app/dashboard/settings/access-level/_components/AccessLevelTableFilter";
import CustomTable from "@/components/Tables/CustomTable";
import Pagination from "@/components/Tables/Pagination";

export interface UserReadDto {
    name: string;
    users: { id: number, email: string, picture?: string }[];
}

const users: UserReadDto[] = [
    {
        name: "Finance",
        users: [
            {
                id: 1,
                email: "bright@gmail.com"
            }
        ]
    },
    {
        name: "Team Lead",
        users: [
            {
                id: 1,
                email: "bright@gmail.com"
            }
        ]
    },
];


const LIMIT = 5;

export default function AccessLevelTable() {
    const usersColumns: ColumnDef<UserReadDto>[] = [
        {
            accessorKey: "name",
            header: "Name",
        },
        {
            accessorKey: "firstName",
            header: "Users",
        }
    ]

    const [tableData, _] = useState<UserReadDto[]>(users)
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )
    const table: Table<UserReadDto> = useReactTable({
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
