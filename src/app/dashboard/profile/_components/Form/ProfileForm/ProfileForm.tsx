"use client"

import FormTextInput from "@/components/Form/Inputs/FormTextInput/FormTextInput";
import React, {useState} from "react";
import FormSelectInput from "@/components/Form/Inputs/FormTextInput/FormSelectInput";
import ActionButton from "@/components/Button/ActionButton";
import useProfileForm, {ProfileFormFields} from "@/app/dashboard/profile/_components/Form/ProfileForm/useProfileForm";
import FormDatePickerInput from "@/components/Form/Inputs/FormTextInput/FormDatePickerInput";
import {EmployeeReadDto} from "@/services/users/dto/Response/EmployeeReadDto";

interface ProfileFormProps {
    authenticatedUserDetails: EmployeeReadDto | null,
    editingProfile?: boolean
}


const GENDER_VALUES = ["Male", "Female", "Other"];
const MARITAL_STATUS_VALUES = ["Single", "Married", "Divorced", "Widowed"]

const ProfileForm = ({authenticatedUserDetails, editingProfile = true}: ProfileFormProps) => {

    const [gender, setGender] = useState<string>("")
    const {
        handleSubmit,
        onSubmit,
        errors,
        register,
        setValue,
        isSubmitting,
        getValues,
        control
    }
        = useProfileForm({authenticatedUserDetails})


    return (
        <div
            className="w-full p-4 bg-gray-white rounded-md"
        >
            <h1
                className={"text-gray-text font-bold text-[1.4rem]"}
            >Staff Information</h1>
            <p
                className={"text-gray-700 text-[.9rem]"}
            >Please complete the form below to update your profile information.</p>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full  flex my-4 flex-wrap gap-[1.5rem] items-center justify-between"
            >
                <FormTextInput<ProfileFormFields>
                    disabled={true}
                    wrapperClassName={"md:w-[48%] shrink-0 "}
                    label="Email"
                    required={true}
                    placeholder="Email"
                    register={register}
                    name="email"
                    errors={errors}

                />
                <FormTextInput<ProfileFormFields>
                    wrapperClassName={"md:w-[48%] shrink-0 "}
                    disabled={!editingProfile}
                    label="First Name"
                    required={true}
                    placeholder="First Name"
                    register={register}
                    name="firstName"
                    errors={errors}


                />

                <FormTextInput<ProfileFormFields>
                    disabled={!editingProfile}
                    wrapperClassName={"md:w-[48%] shrink-0 "}
                    label="Last Name"
                    required={true}
                    placeholder="Last Name"
                    register={register}
                    name="lastName"
                    errors={errors}
                />

                <FormTextInput<ProfileFormFields>
                    disabled={!editingProfile}
                    wrapperClassName={"md:w-[48%] shrink-0 "}
                    label="Other Name"
                    placeholder="Other Name"
                    register={register}
                    name="otherName"
                    errors={errors}
                />
                <FormSelectInput<ProfileFormFields>
                    disabled={!editingProfile}
                    wrapperClassName={"md:w-[48%] shrink-0 "}
                    required={true}
                    defaultValue={getValues("gender")}
                    label="Gender"
                    placeholder="Select Your Gender"
                    register={register}
                    onValueChange={(value) => {
                        setValue("gender", value)
                    }}
                    values={GENDER_VALUES?.map((item) => ({name: item, value: item}))}
                    name="gender"
                    errors={errors}
                />

                <FormSelectInput<ProfileFormFields>
                    disabled={!editingProfile}
                    wrapperClassName={"md:w-[48%] shrink-0 "}
                    required={true}
                    defaultValue={getValues("maritalStatus")}
                    label="Marital Status"
                    placeholder="Select Your Marital Status"
                    register={register}
                    onValueChange={(value) => {
                        setValue("maritalStatus", value)
                    }}
                    values={MARITAL_STATUS_VALUES?.map((item) => ({name: item, value: item}))}
                    name="maritalStatus"
                    errors={errors}
                />

                <FormTextInput<ProfileFormFields>
                    disabled={!editingProfile}
                    wrapperClassName={"md:w-[48%] shrink-0 "}
                    label="Address"
                    placeholder="Address"
                    register={register}
                    name="address"
                    errors={errors}
                />
                <FormTextInput<ProfileFormFields>
                    disabled={!editingProfile}
                    wrapperClassName={"md:w-[48%] shrink-0 "}
                    label="Phone Number"
                    required={true}
                    placeholder="Phone Number"
                    register={register}
                    name="phone"
                    errors={errors}
                />
                <FormTextInput<ProfileFormFields>
                    disabled={!editingProfile}
                    wrapperClassName={"md:w-[48%] shrink-0 "}
                    label="Nationality"
                    required={true}
                    placeholder="Your Nationality"
                    register={register}
                    name="nationality"
                    errors={errors}
                />

                <FormDatePickerInput<ProfileFormFields>
                    disabled={!editingProfile}
                    control={control} // Pass the control prop
                    wrapperClassName={"md:w-[48%] shrink-0"}
                    label="Date of Birth"
                    required={true}
                    register={register}
                    name="dateOfBirth"
                    errors={errors}
                />

                {
                    editingProfile &&

                    <div
                        className={"w-full flex justify-start items-center gap-2"}
                    >
                        <ActionButton
                            className={"px-6"}
                            loading={isSubmitting}
                            type={"submit"}
                        >
                            Save
                        </ActionButton>
                    </div>
                }

            </form>

        </div>
    )
}

export default ProfileForm;
