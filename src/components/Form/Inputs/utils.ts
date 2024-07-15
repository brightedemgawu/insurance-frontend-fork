import {FieldErrors, FieldValues, UseFormRegister} from "react-hook-form";
import {InputWrapperProps} from "@/components/Form/Inputs/InputWrapper";
import {VariantProps} from "class-variance-authority";
import {inputStyleVariants} from "@/components/Form/Inputs/inputStyleVariants";
import React from "react";

export interface FormInputProps<T extends FieldValues>
    extends Omit<InputWrapperProps, "name" | "children" | "invalid">,
        VariantProps<typeof inputStyleVariants> {
    register: UseFormRegister<T>;
    errors: FieldErrors<T>;
    name: keyof T;
    invalid?: boolean;
    inputRef?: React.Ref<HTMLInputElement>;
    disabled?: boolean;
    placeholder?: string;
    className?: string,
    type?: "text" | "password";
    wrapperClassName?: string
}
