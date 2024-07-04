import {cva} from "class-variance-authority";

export const buttonStyleVariants = cva(
    "px-4 py-[10px] flex gap-2  tracking-wider font-normal text-[.9rem] items-center justify-center rounded-md outline-none focus:ring-4 shadow-lg transform active:scale-95 transition-transform  disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed ",
    {
        variants: {
            variant: {
                "default": "bg-primary-surface text-gray-white hover:bg-primary-600",
                "destructive": "bg-error-surface text-gray-white focus:ring-error-200",
                "light": "bg-gray-white border-[1px] border-gray-600 hover:bg-gray-100 text-gray-black focus:ring-gray-400",
                "alternative": "bg-gray-white border-[1px] border-gray-600 text-gray-black  active:text-primary-text hover:border-primary-600  hover:text-primary-text focus:ring-primary-border",
                "link": "shadow-none text-gray-black hover:text-primary-text",
            }
        },
        defaultVariants: {
            variant: "default",
        }
    }
)
