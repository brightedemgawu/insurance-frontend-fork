import {ReactNode} from "react";
import AppButton from "@/components/Button/AppButton";
import {CaretSortIcon} from "@radix-ui/react-icons";

interface SortableTableHeaderProps {
    children: ReactNode;
    onClick: () => void;
}

const SortableTableHeader = ({children, onClick}: SortableTableHeaderProps) => {
    return (
        <AppButton
            variant={"link"}
            className={"p-0 gap-1 font-medium hover:text-gray-text focus:ring-0 "}
            onClick={onClick}
        >
            {children}
            <CaretSortIcon className=" h-4 w-4"/>
        </AppButton>
    )
}

export default SortableTableHeader;
