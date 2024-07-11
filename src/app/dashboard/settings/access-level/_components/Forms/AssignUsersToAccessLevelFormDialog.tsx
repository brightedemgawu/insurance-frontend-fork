import {EmployeeReadDto} from "@/services/users/dto/Response/EmployeeReadDto";
import React, {useState} from "react";
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
import {Dialog, DialogContent, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import CustomTable from "@/components/Tables/CustomTable";
import Pagination from "@/components/Tables/Pagination";
import AssignUsersTableFilter from "@/app/dashboard/settings/access-level/_components/Table/AssgnUsersTableFilter";
import SortableTableHeader from "@/components/Tables/SortableTableHeader";

interface AssignUsersToAccessLevelFormDialogProps {
    allEmployees: EmployeeReadDto[],
    assignedEmployees: EmployeeReadDto[],
    onAddEmployee: (employee: EmployeeReadDto) => void,
    onRemoveEmployee: (employee: EmployeeReadDto) => void
}

const TABLE_LIMIT = 5;

const AssignUsersToAccessLevelFormDialog = ({
                                                allEmployees,
                                                onAddEmployee,
                                                assignedEmployees,
                                                onRemoveEmployee,
                                            }: AssignUsersToAccessLevelFormDialogProps) => {


    const [open, setOpen] = useState(false);
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
                const isEmployeeAssigned: boolean = !!assignedEmployees.find(employee => employee.id === rowData.id)


                if (isEmployeeAssigned) {
                    return (
                        <AppButton
                            onClick={() => onRemoveEmployee(rowData)}
                            className={"py-2 text-[.8rem] bg-gray-white hover:bg-gray-white text-error-text border-[1px] border-error-border focus:ring-error-border "}
                        >
                            Remove
                        </AppButton>
                    )
                }

                return (
                    <AppButton
                        className={"py-2 px-8 text-[.7rem] "}
                        onClick={() => onAddEmployee(rowData)}
                    >
                        Add
                    </AppButton>

                )
            }
        }
    ]
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )

    const table: Table<EmployeeReadDto> = useReactTable({
        data: allEmployees,
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
        <Dialog
            open={open} onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <div>

                    <AppButton
                        className={" md:text-[.7rem]"}
                    >
                        Add User
                    </AppButton>
                </div>
            </DialogTrigger>

            <DialogContent className="w-[95%] overflow-y-scroll sm:overflow-hidden  sm:max-w-fit">
                <DialogTitle>
                    <h1
                        className={"text-[1.1rem] text-gray-text font-[700]"}
                    >
                        Users
                        {" "}
                        <span
                            className={"text-gray-700"}
                        >
                        ({table.getPrePaginationRowModel().rows.length})
                        </span>
                    </h1>
                    <div
                        className={"w-full mt-2"}
                    >
                        <AssignUsersTableFilter table={table}/>
                        <CustomTable table={table} columns={tableColumns}/>
                        <Pagination table={table}/>
                    </div>
                </DialogTitle>
            </DialogContent>
        </Dialog>

    )
}

export default AssignUsersToAccessLevelFormDialog;
