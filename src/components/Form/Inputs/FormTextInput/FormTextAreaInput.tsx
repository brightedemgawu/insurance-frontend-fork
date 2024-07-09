import {FieldValues, Path} from "react-hook-form";
import {inputStyleVariants} from "@/components/Form/Inputs/inputStyleVariants";
import React from "react";
import {cn} from "@/lib/utils";
import {FormInputProps} from "@/components/Form/Inputs/utils";
import Wrapper from "@/components/Form/Inputs/Wrapper";


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
                                                                     errors,
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
        </Wrapper>
    )
}
