import {FieldValues, Path, UseFormRegister} from "react-hook-form";
import InputWrapper, {InputWrapperProps} from "@/components/Form/Inputs/InputWrapper";
import {VariantProps} from "class-variance-authority";
import {inputStyleVariants} from "@/components/Form/Inputs/inputStyleVariants";
import React from "react";
import {cn} from "@/lib/utils";

interface FormTextAreaInputProps<T extends FieldValues>
    extends Omit<InputWrapperProps, "name" | "children">,
        VariantProps<typeof inputStyleVariants> {
    register: UseFormRegister<T>;
    name: keyof T;
    inputRef?: React.Ref<HTMLInputElement>;
    disabled?: boolean;
    placeholder?: string;
    className?: string,
    wrapperClassName?: string
}

export default function FormTextAreaInput<T extends FieldValues>({
                                                                     register, name,
                                                                     Icon,
                                                                     required,
                                                                     disabled,
                                                                     invalid,
                                                                     variant,
                                                                     wrapperClassName,
                                                                     label,
                                                                     inputRef,
                                                                     className,
                                                                     error,
                                                                     ...props
                                                                 }: FormTextAreaInputProps<T>) {
    return (
        <InputWrapper
            error={error}
            Icon={Icon}
            required={required}
            name={name as string}
            invalid={invalid}
            label={label}
            className={wrapperClassName}
        >

            <textarea
                disabled={disabled}
                id={name as string}
                {...register(name as Path<T>)}
                aria-invalid={invalid}
                className={cn(
                    inputStyleVariants({variant, className}),
                    {"pl-[30px]": Icon}
                )}
                {...props}
            />
        </InputWrapper>
    )
}
