"use client"
import React from 'react';
import {Table} from "@tanstack/table-core";
import {cn} from "@/lib/utils";
import {buttonStyleVariants} from "@/components/Button/buttonStyleVariants";
import AppTextInput from "@/components/Form/Inputs/AppTextInput/AppTextInput";
import debounce from 'lodash/debounce';

interface PaginationProps<TData> {
    table: Table<TData>;
}


export default function Pagination<TData>({table}: PaginationProps<TData>) {

    const handlePageChange = debounce((page: number) => {
        table.setPageIndex(page);
    }, 300)

    return (
        <div className="w-full my-4 flex flex-col  gap-2 md:flex-row md:justify-between md:items-center px-2">
            <p className={"text-gray-800 text-[.9rem]"}>
                Page {' '}
                <span
                    className={"text-gray-text font-bold"}
                >
                    {table.getState().pagination.pageIndex + 1} of{' '}
                    {table.getPageCount().toLocaleString()}
                    </span>
            </p>
            <div
                className={"flex items-center gap-2 md:gap-8"}
            >

                <div className="flex items-center gap-2">
                    <button

                        className={cn(buttonStyleVariants({variant: "light", className: "px-2 py-1 font-medium"}))}
                        onClick={() => {
                            table.firstPage()
                        }}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {'<<'}
                    </button>
                    <button
                        className={cn(buttonStyleVariants({variant: "light", className: "px-2 py-1 font-medium"}))}
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        {'<'}
                    </button>
                    <button
                        className={cn(buttonStyleVariants({variant: "light", className: "px-2 py-1 font-medium"}))}
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {'>'}
                    </button>
                    <button
                        className={cn(buttonStyleVariants({variant: "light", className: "px-2 py-1 font-medium"}))}
                        onClick={() => table.lastPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        {'>>'}
                    </button>

                </div>

                <div className="flex items-center gap-1 text-gray-800 text-[.9rem]">
                    <p
                        className={"shrink-0"}
                    >
                        Go to page
                    </p>
                    <AppTextInput
                        className={"w-[60px]  p-1 pl-2 "}
                        disabled={(table.getPrePaginationRowModel().rows.length <= 0)}
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={e => {
                            const page = e ? Number(e) - 1 : 0
                            handlePageChange(page)
                        }}
                        type={"number"}
                        name={"page"}
                    />
                </div>
            </div>
        </div>


    );
};
