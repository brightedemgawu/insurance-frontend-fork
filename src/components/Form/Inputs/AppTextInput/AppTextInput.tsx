import {VariantProps} from "class-variance-authority";
import {inputStyleVariants} from "@/components/Form/Inputs/inputStyleVariants";
import {cn} from "@/lib/utils";
import {InputWrapperProps} from "@/components/Form/Inputs/InputWrapper";
import Wrapper from "@/components/Form/Inputs/Wrapper";

export type AppTextInputProps = Omit<InputWrapperProps, "children"> & VariantProps<typeof inputStyleVariants> & {
    inputRef?: React.Ref<HTMLInputElement>;
    disabled?: boolean;
    defaultValue?: string | number;
    placeholder?: string;
    type?: "text" | "password" | "number";
    className?: string,
    onChange?: (value: string) => void | Promise<void>
}


export default function AppTextInput({
                                         Icon,
                                         required,
                                         disabled,
                                         type,
                                         invalid,
                                         variant,
                                         label,
                                         inputRef,
                                         defaultValue,
                                         className,
                                         name,
                                         onChange,
                                         error,
                                         ...props
                                     }: AppTextInputProps) {
    return (

        <Wrapper
            error={error}
            Icon={Icon}
            required={required}
            name={name}
            invalid={invalid}
            label={label}
        >
            <input
                ref={inputRef}
                defaultValue={defaultValue}
                type={type}
                disabled={disabled}
                id={name}
                onChange={async (event) =>
                    onChange && await onChange(event?.target?.value ?? "")
                }
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
