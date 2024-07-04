import {cva} from "class-variance-authority";

export const inputStyleVariants = cva(
    [
        "w-full outline-none bg-gray-50/50 border border-gray-300 text-gray-black ",
        "text-[.9rem] rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-400 tracking-wider",
        "py-2 px-3 placeholder:text-gray-600 tracking-normal",
        "group-data-[invalid=true]:bg-error-50 group-data-[invalid=true]:text-error-text ",
        "group-data-[invalid=true]:focus:ring-error-500 group-data-[invalid=true]:focus:border-error-400",
        "group-data-[invalid=true]:border-error-border",
        "group-data-[invalid=true]:pr-[28px]",
        "group-data-[invalid=true]:placeholder:text-error-text",
        "disabled:cursor-not-allowed "
    ],
    {
        variants: {
            variant: {}
        }
    }
)
