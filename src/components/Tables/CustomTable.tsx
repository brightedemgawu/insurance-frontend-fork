import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {flexRender, Table as TanstackTable} from "@tanstack/react-table";
import {ColumnDef} from "@tanstack/table-core";
import NoData from "@/components/Tables/NoData";

// Define the props interface for CustomTable
interface CustomTableProps<TData> {
    table: TanstackTable<TData>;
    columns: ColumnDef<TData>[];
}

export default function CustomTable<TData>({table, columns}: CustomTableProps<TData>) {
    return (
        <div className="w-full rounded-md border-[1px] border-gray-50 ">
            <Table
                className={"max-w-[100%] "}
            >
                <TableHeader
                    className={"bg-gray-50 "}
                >
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow
                            className={"text-gray-text-caption hover:bg-gray-50"}
                            key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                className={" border-b-[1px] border-b-gray-50"}
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                <NoData/>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}
