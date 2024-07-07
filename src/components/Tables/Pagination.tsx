"use client"
import React from 'react';
import {Table} from "@tanstack/table-core";
import AppButton from "@/components/Button/AppButton";

interface PaginationProps<TData> {
    table: Table<TData>;
}


export default function Pagination<TData>({table}: PaginationProps<TData>) {


    return (
        <div className="flex items-center justify-end space-x-2 py-4">
            <AppButton
                variant={"light"}
                className={"w-[90px] text-[.8rem]"}
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
            >
                Previous
            </AppButton>
            <AppButton
                variant={"light"}
                className={"w-[90px] text-[.8rem]"}
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
            >
                Next
            </AppButton>
        </div>
    );
};
