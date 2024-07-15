import {FieldValues} from "react-hook-form";
import {inputStyleVariants} from "@/components/Form/Inputs/inputStyleVariants";
import React from "react";
import {cn} from "@/lib/utils";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {FormInputProps} from "@/components/Form/Inputs/utils";
import Wrapper from "@/components/Form/Inputs/Wrapper";

interface FormSelectInputProps<T extends FieldValues>
    extends FormInputProps<T> {
    values: { name: string, value: string }[],
    defaultValue?: string,
    onValueChange: (value: string) => void,
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
        defaultValue,
        onValueChange,
        errors,
        ...props
    }: FormSelectInputProps<T>
) {
    return (
        <Wrapper
            error={errors[name]?.message as string}
            Icon={Icon}
            required={required}
            name={name as string}
            invalid={invalid || !!(errors[name] && errors[name].message)}
            label={label}
            className={wrapperClassName}
        >

            <Select
                defaultValue={defaultValue}
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
        </Wrapper>
    );
}
