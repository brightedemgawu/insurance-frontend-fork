import {FieldValues, UseFormRegister} from "react-hook-form";
import InputWrapper, {InputWrapperProps} from "@/components/Form/Inputs/InputWrapper";
import {VariantProps} from "class-variance-authority";
import {inputStyleVariants} from "@/components/Form/Inputs/inputStyleVariants";
import React from "react";
import {cn} from "@/lib/utils";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

interface FormSelectInputProps<T extends FieldValues>
    extends Omit<InputWrapperProps, "name" | "children">,
        VariantProps<typeof inputStyleVariants> {
    register: UseFormRegister<T>;
    values: { name: string, value: string }[],
    name: keyof T;
    inputRef?: React.Ref<HTMLInputElement>;
    disabled?: boolean;
    placeholder?: string;
    type?: "text" | "password";
    className?: string,
    onValueChange: (value: string) => void,
    wrapperClassName?: string
}

export default function FormSelectInput<T extends FieldValues>(
    {
        register, name,
        Icon,
        required,
        disabled,
        type,
        values,
        invalid,
        variant,
        wrapperClassName,
        label,
        inputRef,
        className,
        onValueChange,
        error,
        ...props
    }: FormSelectInputProps<T>
) {
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

            <Select
                onValueChange={onValueChange}
                disabled={disabled}
            >
                <SelectTrigger
                    className={cn(
                        inputStyleVariants({variant, className}),
                        {"pl-[30px]": Icon}
                    )}
                >
                    <SelectValue placeholder={props.placeholder}/>
                </SelectTrigger>
                <SelectContent>
                    {values.map((item, index) => {
                        return (
                            <SelectItem
                                key={index}
                                value={item.value}>
                                {item.name}
                            </SelectItem>
                        )
                    })}
                </SelectContent>
            </Select>
        </InputWrapper>

    );
}
