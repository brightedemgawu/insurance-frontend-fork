import {cn} from "@/lib/utils";
import {CircleAlert, LucideIcon} from "lucide-react";
import React, {ReactNode} from "react";

export interface InputWrapperProps {
    error?: string,
    Icon?: LucideIcon;
    required?: boolean;
    invalid?: boolean;
    name: string;
    className?: string;
    label?: ReactNode;
    children: ReactNode;
}


export default function InputWrapper({
                                         error,
                                         children,
                                         className,
                                         name,
                                         label,
                                         invalid,
                                         Icon,
                                         required
                                     }: InputWrapperProps) {
    return (
        <div
            className={cn("group w-full flex flex-col gap-1 data-[invalid=true]:text-error-text ", className)}
            data-invalid={invalid}
        >
            {label &&
                < label
                    htmlFor={name}
                    className={"flex items-center font-medium gap-[.2rem] text-gray-text tracking-wide text-[.9rem] group-data-[invalid=true]:text-error-text "}
                >
                    <p>{label}</p>
                    {required && <span className="font-extrabold">*</span>}
                </label>
            }
            <div
                className={"w-full relative"}
            >
                {children}
                {Icon &&
                    <Icon
                        size={15}
                        className={
                            cn([
                                "text-gray-600 absolute top-0 left-[.6rem] h-full  pointer-events-none",
                                "group-data-[invalid=true]:text-error-text"
                            ])}
                    />
                }

                <CircleAlert
                    size={15}
                    className={cn([
                        "text-error-text absolute top-0 right-[.7rem] h-full  pointer-events-none",
                        "hidden group-data-[invalid=true]:inline-block"
                    ])}
                />
            </div>
            <div className={cn([
                    "hidden font-normal text-[.8rem] text-error-text",
                    "hidden group-data-[invalid=true]:inline-block"
                ]
            )}>
                {error}
            </div>
        </div>
    )
}
