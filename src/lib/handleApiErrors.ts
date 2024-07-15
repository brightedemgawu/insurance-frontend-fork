import {toast} from "sonner";
import {AxiosError} from "axios";
import {Path, UseFormSetError} from "react-hook-form";
import ApiResponse from "@/types/ApiResponse";


/**
 * Handle API errors during login and set the appropriate error messages
 * on the form fields using the setError function from react-hook-form.
 *
 * @param error - The error object caught from the API call.
 * @param setError - The setError function from react-hook-form to set form errors.
 * @param fields
 * @param toastTitle
 */
export const handleFormApiErrors = <T extends Record<string, any>>(error: unknown, setError: UseFormSetError<T>, fields: string[], toastTitle?: string) => {
    // Extract the error response from the error object, typed as ApiResponse<string>.
    const errorResponse = (error as AxiosError).response?.data as ApiResponse<string>;
    // If there's a general message in the error response, show it as a toast notification.
    if (errorResponse?.message) {
        toast.error(toastTitle, {description: errorResponse.message});
    }
    // If the error response contains validation errors and it's an array, process each validation error.
    if (errorResponse?.errors && typeof errorResponse.errors === 'object' && Array.isArray(errorResponse.errors)) {
        errorResponse.errors.forEach(validationError => {
            const {propertyName, errorMessage} = validationError;
            // Set the form error for each field based on the propertyName and errorMessage.
            setError(propertyName.toLowerCase(), {message: errorMessage});
        });

        // If the error response contains a single error message as a string, set this error message for all fields.
    } else if (errorResponse?.errors && typeof errorResponse?.errors === 'string') {
        const errorMessage = errorResponse.errors;
        fields.forEach(field => {
            setError(field as Path<T>, {message: errorMessage});
        })
    } else {
        const generalError = errorResponse?.message ?? "An unexpected error occurred.";
        fields.forEach(field => {
            setError(field as Path<T>, {message: generalError});
        })
    }
}


export const handleApiErrors = (error: unknown, toastTitle?: string) => {
    // Extract the error response from the error object, typed as ApiResponse<string>.
    const errorResponse = (error as AxiosError).response?.data as ApiResponse<string>;
    // If there's a general message in the error response, show it as a toast notification.
    if (errorResponse?.message) {
        toast.error(toastTitle, {description: errorResponse.message});
    }

}
