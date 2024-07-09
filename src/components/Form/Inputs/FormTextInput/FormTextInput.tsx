import {FieldValues, Path} from "react-hook-form";
import {cn} from "@/lib/utils";
import {inputStyleVariants} from "@/components/Form/Inputs/inputStyleVariants";
import React from "react";
import {FormInputProps} from "@/components/Form/Inputs/utils";
import Wrapper from "@/components/Form/Inputs/Wrapper";

export default function FormTextInput<T extends FieldValues>({
                                                                 register,
                                                                 name,
                                                                 type,
                                                                 disabled,
                                                                 invalid,
                                                                 variant,
                                                                 className,
                                                                 Icon,
                                                                 errors,
                                                                 required,
                                                                 label,
                                                                 wrapperClassName,
                                                                 ...props
                                                             }: FormInputProps<T>) {
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

        </Wrapper>
    );
}
