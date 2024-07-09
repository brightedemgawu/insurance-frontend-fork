import InputWrapper, {InputWrapperProps} from "@/components/Form/Inputs/InputWrapper";


const Wrapper = ({children, ...props}: InputWrapperProps) => {
    return (
        <InputWrapper
            {...props}
        >
            {children}
        </InputWrapper>

    )
}

export default Wrapper;
