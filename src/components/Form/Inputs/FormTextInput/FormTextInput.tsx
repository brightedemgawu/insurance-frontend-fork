import {FieldValues, Path, UseFormRegister} from "react-hook-form";
import {cn} from "@/lib/utils";
import {inputStyleVariants} from "@/components/Form/Inputs/inputStyleVariants";
import React from "react";
import InputWrapper, {InputWrapperProps} from "@/components/Form/Inputs/InputWrapper";
import {VariantProps} from "class-variance-authority";

interface FormTextInputProps<T extends FieldValues>
    extends Omit<InputWrapperProps, "name" | "children">,
        VariantProps<typeof inputStyleVariants> {
    register: UseFormRegister<T>;
    name: keyof T;
    inputRef?: React.Ref<HTMLInputElement>;
    disabled?: boolean;
    placeholder?: string;
    type?: "text" | "password";
    className?: string,
    wrapperClassName?: string
}

export default function FormTextInput<T extends FieldValues>({
                                                                 register, name,
                                                                 Icon,
                                                                 required,
                                                                 disabled,
                                                                 type,
                                                                 invalid,
                                                                 variant,
                                                                 wrapperClassName,
                                                                 label,
                                                                 inputRef,
                                                                 className,
                                                                 error,
                                                                 ...props
                                                             }: FormTextInputProps<T>) {
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

            <input
                type={type}
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

    );
}
