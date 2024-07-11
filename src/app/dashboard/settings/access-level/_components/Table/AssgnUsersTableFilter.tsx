import {Table} from "@tanstack/table-core";
import AppTextInput from "@/components/Form/Inputs/AppTextInput/AppTextInput";
import {Search} from "lucide-react";

interface AssignUsersTableFilterProps<TData> {
    table: Table<TData>;
}

const AssignUsersTableFilter = <TData, >({table}: AssignUsersTableFilterProps<TData>) => {
    return (
        <div
            className={"w-full my-4 flex items-center"}
        >
            <div
                className={"w-full"}
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

export default AssignUsersTableFilter;
