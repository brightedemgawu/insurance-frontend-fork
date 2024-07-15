"use client"

import ProfileForm from "@/app/dashboard/profile/_components/Form/ProfileForm/ProfileForm";
import useAuthenticatedUserDetails from "@/hooks/auth/useAuthenticatedUserDetails";
import UserPhotoForm from "@/app/dashboard/profile/_components/Form/UserPhoto/UserPhotoForm";
import {useEffect, useState} from "react";

interface UserProfileSectionProps {
    onProfilePage: boolean
}

const UserProfileSection = ({onProfilePage}: UserProfileSectionProps) => {
    const {authenticatedUserDetails} = useAuthenticatedUserDetails()
    const [editingProfile, setEditingProfile] = useState<boolean>(false)
    const [profilePage, setProfilePage] = useState<boolean>(true)

    useEffect(() => {
        setEditingProfile(!onProfilePage)
        setProfilePage(onProfilePage)

    }, [onProfilePage])

    return (
        <div
            className={"w-full"}
        >
            <UserPhotoForm onEditingProfile={(value) => {
                setEditingProfile(value)
            }} onProfilePage={profilePage} authenticatedUserDetails={authenticatedUserDetails}/>
            <ProfileForm editingProfile={editingProfile} authenticatedUserDetails={authenticatedUserDetails}/>
            <div

                className={"h-10 w-full"}>

            </div>
        </div>
    )
}

export default UserProfileSection;
