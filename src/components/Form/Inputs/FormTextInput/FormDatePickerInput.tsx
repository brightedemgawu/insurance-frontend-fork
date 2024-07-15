import {Control, FieldValues, Path, useController} from "react-hook-form";
import React from "react";
import {FormInputProps} from "@/components/Form/Inputs/utils";
import Wrapper from "@/components/Form/Inputs/Wrapper";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {CalendarIcon} from "lucide-react";
import {format} from "date-fns";
import {Calendar} from "@/components/ui/calendar";
import {cn} from "@/lib/utils";
import {inputStyleVariants} from "@/components/Form/Inputs/inputStyleVariants";


interface FormDatePickerInputProps<T extends FieldValues> extends FormInputProps<T> {
    control: Control<T>;
}

export default function FormDatePickerInput<T extends FieldValues>({
                                                                       register,
                                                                       name,
                                                                       type,
                                                                       disabled,
                                                                       invalid,
                                                                       variant,
                                                                       className,
                                                                       Icon,
                                                                       control,
                                                                       errors,
                                                                       required,
                                                                       label,
                                                                       wrapperClassName,
                                                                       ...props
                                                                   }: FormDatePickerInputProps<T>) {
    const {field} = useController({
        name: name as Path<T>,
        control,
    });
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
            <Popover>
                <PopoverTrigger asChild>
                    <button
                        className={cn(
                            inputStyleVariants({variant, className}),
                            "flex items-center justify-between",
                            {"pl-[30px]": Icon}
                        )}
                        disabled={disabled}
                        {...props}
                    >
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="h-4 w-4 opacity-50"/>
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>

        </Wrapper>
    );
}
