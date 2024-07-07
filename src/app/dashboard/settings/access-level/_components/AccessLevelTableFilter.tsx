import {Table} from "@tanstack/table-core";
import AppTextInput from "@/components/Form/Inputs/AppTextInput/AppTextInput";
import {Search} from "lucide-react";

interface AccessLevelTableFilterProps<TData> {
    table: Table<TData>;
}

export default function AccessLevelTableFilter<TData>({table}: AccessLevelTableFilterProps<TData>) {
    return (
        <div
            className={"w-full my-4 flex items-center"}
        >
            <div
                className={"w-full md:w-[400px]"}
            >
                <AppTextInput
                    placeholder="Filter by name..."
                    name={"Search"}
                    Icon={Search}
                    onChange={async (value) => {
                        table.getColumn("name")?.setFilterValue(value)
                    }}/>
            </div>

        </div>
    )
}
