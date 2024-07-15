import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import z from "zod";
import {useEffect} from "react";
import {UpdateEmployeeDto} from "@/services/users/dto/Request/UpdateEmployeeDto";
import useUsersService from "@/services/users/useUsersService";
import {toast} from "sonner";
import {handleFormApiErrors} from "@/lib/handleApiErrors";
import {useSignInUser} from "@/hooks/auth/useSignInUser";
import {EmployeeReadDto} from "@/services/users/dto/Response/EmployeeReadDto";

interface useProfileFormProps {
    authenticatedUserDetails: EmployeeReadDto | null
}

const schema = z.object({
    email: z.string().email({message: 'Please enter a valid email address'}),
    firstName: z.string({message: "name is required"}).min(3, {message: 'Length should be greater than 3 characters'}),
    lastName: z.string({message: "name is required"}).min(3, {message: 'Length should be greater than 3 characters'}),
    otherName: z.string(),
    dateOfBirth: z.date(),
    gender: z.string({message: "Gender is required"}).min(3, {message: 'Length should be greater than 3 characters'}),
    nationality: z.string({message: "Nationality is required"}).min(3, {message: 'Length should be greater than 3 characters'}),
    maritalStatus: z.string({message: "Marital Status is required"}).min(3, {message: 'Length should be greater than 3 characters'}),
    phone: z.string()
        .regex(/^\d+$/, {message: 'Phone number should only contain digits'})
        .min(3, {message: 'Length should be greater than 3 characters'})
        .max(15, {message: 'Length should not exceed 15 characters'}),
    address: z.string({message: "Address is required"}).min(3, {message: 'Length should be greater than 3 characters'}),
});

export type ProfileFormFields = z.infer<typeof schema>;

const useProfileForm = ({authenticatedUserDetails}: useProfileFormProps) => {


    const {
        register,
        handleSubmit,
        setError,
        reset,
        control,
        setValue,
        getValues,
        formState: {errors, isSubmitting},
    } = useForm<ProfileFormFields>({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        if (authenticatedUserDetails) {
            setValue("email", authenticatedUserDetails.email)
            setValue("firstName", authenticatedUserDetails.employeeInfo?.firstName ?? authenticatedUserDetails.name)
            setValue("lastName", authenticatedUserDetails.employeeInfo?.lastName ?? "")
            setValue("otherName", authenticatedUserDetails.employeeInfo?.otherName ?? "")
            setValue("gender", authenticatedUserDetails.employeeInfo?.gender ?? "")
            setValue("maritalStatus", authenticatedUserDetails.employeeInfo?.maritalStatus ?? "")
            setValue("address", authenticatedUserDetails.employeeInfo?.address ?? "")
            setValue("phone", authenticatedUserDetails.employeeInfo?.phone ?? "")
            setValue("nationality", authenticatedUserDetails.employeeInfo?.nationality ?? "")
            setValue("dateOfBirth", new Date(authenticatedUserDetails.employeeInfo?.dateOfBirth ?? "2008-01-01"))
        }

    }, [authenticatedUserDetails]);


    const {signInUser} = useSignInUser()

    const {updatedEmployee} = useUsersService()
    const onSubmit: SubmitHandler<ProfileFormFields> = async (data) => {
        const dto: UpdateEmployeeDto = {...data}
        await updatedEmployee(dto)
            .then((response) => {
                if (response.success) {
                    signInUser(response.data!)
                    toast.success("Details updated successfully", {
                        description: "Your details have been updated. It may take some time for the changes to reflect across the application.",
                        duration: 8000,
                    });
                } else {
                    toast.error("Error updating staff")
                }
            })
            .catch(errors => {
                handleFormApiErrors<ProfileFormFields>(errors,
                    setError,
                    Object.keys(schema.shape),
                    "Field to update details"
                )
            })
    };


    return {
        onSubmit,
        errors,
        register,
        getValues,
        setValue,
        isSubmitting,
        handleSubmit,
        control
    }
}

export default useProfileForm;
