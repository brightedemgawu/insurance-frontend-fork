import {EmployeeReadDto} from "@/services/users/dto/Response/EmployeeReadDto";
import {useState} from "react";
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
import AppButton from "@/components/Button/AppButton";
import UserAvatarWithDetails from "@/components/Auth/UserAvatarWithDetails";
import {useReactTable} from "@tanstack/react-table";
import CustomTable from "@/components/Tables/CustomTable";
import Pagination from "@/components/Tables/Pagination";
import AssignUsersTableFilter from "@/app/dashboard/settings/access-level/_components/Table/AssgnUsersTableFilter";
import SortableTableHeader from "@/components/Tables/SortableTableHeader";

interface AccessLevelAssignedUsersProps {
    tableData: EmployeeReadDto[],
    onRemoveEmployee: (employee: EmployeeReadDto) => void
}


const TABLE_LIMIT = 5;

const AccessLevelAssignedUsers = ({tableData, onRemoveEmployee}: AccessLevelAssignedUsersProps) => {

    const [sorting, setSorting] = useState<SortingState>([])
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
            id: "actions",
            cell: ({row}) => {
                const rowData = row.original
                return (
                    <AppButton
                        onClick={() => onRemoveEmployee(rowData)}
                        className={"py-2 text-[.8rem] bg-gray-white hover:bg-gray-white text-error-text border-[1px] border-error-border focus:ring-error-border "}
                    >
                        Remove
                    </AppButton>
                )
            }
        }
    ]
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])


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
                pageSize: TABLE_LIMIT
            }
        }
    })
    return (
        <div
            className={"w-full mt-2"}
        >
            <AssignUsersTableFilter table={table}/>
            <CustomTable table={table} columns={tableColumns}/>
            <Pagination table={table}/>
        </div>
    )
}

export default AccessLevelAssignedUsers;
