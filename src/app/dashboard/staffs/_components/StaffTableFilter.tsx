import {Table} from "@tanstack/table-core";
import AppTextInput from "@/components/Form/Inputs/AppTextInput/AppTextInput";
import {Search} from "lucide-react";

interface StaffTableFilterProps<TData> {
    table: Table<TData>;
}

export default function StaffTableFilter<TData>({table}: StaffTableFilterProps<TData>) {
    return (
        <div
            className={"w-full my-4 flex items-center"}
        >
            <div
                className={"w-full md:w-[400px]"}
            >
                <AppTextInput
                    placeholder="Filter by email..."
                    name={"Search"}
                    Icon={Search}
                    onChange={async (value) => {
                        table.getColumn("email")?.setFilterValue(value)
                    }}/>
            </div>

        </div>
    )
}
