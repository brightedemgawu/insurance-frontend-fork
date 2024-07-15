"use client"

import {EmployeeReadDto} from "@/services/users/dto/Response/EmployeeReadDto";
import AppButton from "@/components/Button/AppButton";
import {useEffect, useRef, useState} from "react";
import {capitalizeFirstLetter, cn} from "@/lib/utils";
import UserAvatar from "@/components/Auth/UserAvatar";
import {PenLine} from "lucide-react";
import {toast} from "sonner";
import Image from "next/image";
import useUsersService from "@/services/users/useUsersService";
import {handleApiErrors} from "@/lib/handleApiErrors";
import {useSignInUser} from "@/hooks/auth/useSignInUser";
import ActionButton from "@/components/Button/ActionButton";

interface UserPhotoFormProps {

    onEditingProfile: (value: boolean) => void
    onProfilePage: boolean
    authenticatedUserDetails: EmployeeReadDto | null
}

const UserPhotoForm = ({authenticatedUserDetails, onProfilePage, onEditingProfile}: UserPhotoFormProps) => {
    const [editingProfile, setEditingProfile] = useState<boolean>(false)
    const [profilePage, setProfilePage] = useState<boolean>(false)
    const hiddenFileInput = useRef<HTMLInputElement | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const {uploadProfilePhoto} = useUsersService()
    const {signInUser} = useSignInUser()
    useEffect(() => {
        setEditingProfile(!onProfilePage)
        setProfilePage(onProfilePage)
    }, [onProfilePage]);
    if (!authenticatedUserDetails) {
        return
    }
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const validFileTypes = ["image/jpeg", "image/png"];
            if (!validFileTypes.includes(file.type)) {
                toast.error("Please upload a JPG or PNG image.");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);

            // Prepare form data for submission (if needed)
            const formData = new FormData();
            formData.append("photo", file);
            // Perform upload logic here (e.g., make a fetch request)
        }
    };

    const handleSubmit = async () => {
        if (!preview) return;
        const fileInput = hiddenFileInput.current;
        if (fileInput && fileInput.files) {
            const file = fileInput.files[0];
            const formData = new FormData();
            formData.append("file", file);

            try {
                await uploadProfilePhoto(authenticatedUserDetails.email, formData)
                    .then((response) => {
                        if (response.statusCode === 200) {
                            signInUser(response.data!)
                            toast.success("Photo updated successfully", {
                                description: "Your Photo have been updated. It may take some time for the changes to reflect across the application.",
                                duration: 8000,
                            });
                            setPreview(null)
                        } else {
                            toast.error("Error updating photo")
                        }
                    })
                    .catch((errors) => {
                        handleApiErrors(errors)
                    })

            } catch (error) {
            }
        }

    };
    return (
        <div
            className={`w-full flex flex-col md:flex-row items-center md:justify-between p-4 h-fit md:h-[200px]  mb-6 bg-[url('/svgs/profile-page-bg.svg')]`}
        >

            <div
                className={"w-fit flex items-center gap-3"}
            >
                <div
                    className={"w-fit relative"}
                >
                    {
                        editingProfile &&
                        <AppButton
                            onClick={() => {
                                hiddenFileInput.current!.click();
                            }}
                            variant={"light"}
                            className={"absolute z-10 right-0 bottom-0  w-fit p-4 rounded-full bg-gray-white"}
                        >
                            <PenLine
                                size={15}
                            />
                        </AppButton>
                    }

                    {
                        preview ?
                            <Image
                                width={300}
                                height={300}
                                src={preview}
                                alt="Preview"
                                className={"size-[150px] border-4 border-gray-white overflow-hidden rounded-full "}
                            /> :
                            <UserAvatar
                                containerClassName={cn({
                                    "border-4 border-gray-white rounded-full overflow-hidden ": editingProfile
                                })}
                                className={"size-[150px] text-[2rem]"}
                                disableBeep
                                user={authenticatedUserDetails!}/>
                    }

                    <input
                        onChange={handleFileChange}
                        accept="image/jpeg, image/png"
                        ref={hiddenFileInput}
                        type="file"
                        className={"hidden"}
                    />
                </div>

                <div
                    className={"w-fit flex flex-col gap-1"}
                >
                    <h4
                        className={"font-bold text-[.9rem] md:text-[1.2rem] text-gray-text"}
                    >{authenticatedUserDetails?.name}</h4>
                    <p
                        className={"text-gray-800 text-[.7rem] md:text-[.9rem] "}
                    >{capitalizeFirstLetter(authenticatedUserDetails?.userType ?? "")}</p>
                    <p
                        className={"text-gray-800 text-[.7rem] md:text-[.9rem] "}
                    >{authenticatedUserDetails?.email} | {authenticatedUserDetails?.employeeInfo?.phone}</p>
                </div>
            </div>
            <div
                className={"flex w-full md:w-fit mt-4 md:mt-0  gap-4 items-center"}
            >
                {
                    editingProfile &&
                    <ActionButton
                        className={cn("hidden", {
                            "flex": preview
                        })
                        }
                        onClick={async () => {
                            await handleSubmit();
                        }}
                    >
                        Upload Photo
                    </ActionButton>
                }

                {
                    editingProfile ?
                        <AppButton
                            className={cn("px-8",
                                {"hidden": !profilePage}
                            )}
                            variant={"destructive"}
                            onClick={() => {
                                setEditingProfile((prev) => !prev)
                                onEditingProfile(false)
                                setPreview(null)
                            }}
                        >
                            Cancel
                        </AppButton> :
                        <AppButton
                            variant={"light"}
                            onClick={() => {
                                setEditingProfile((prev) => !prev)
                                onEditingProfile(true)
                            }
                            }
                        >
                            Edit Profile
                        </AppButton>
                }

            </div>
        </div>
    )
}

export default UserPhotoForm;
