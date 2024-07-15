import UserAvatar from "@/components/Auth/UserAvatar";
import {Group} from "lucide-react";
import {getAuthenticatedUser} from "@/actions/getAuthenticatedUser";
import {capitalizeFirstLetter} from "@/lib/utils";

export default async function NavBarUserMenu() {
    const user = await getAuthenticatedUser();

    if (!user) {
        return null
    }
    return (

        <div
            className={"flex gap-2  cursor-pointer items-center "}
        >
            <UserAvatar
                user={user}
            />
            <div
                className={"mx-2"}
            >
                <p
                    className={"text-[12px] text-gray-text font-medium "}
                >{user.name}</p>
                <p
                    className={"text-[10px] text-gray-600  flex items-center gap-1"}
                >
                    <Group
                        size={15}
                        className={"text-primary-text"}
                    />
                    {capitalizeFirstLetter(user.userType)}
                </p>
            </div>


        </div>

    )
}
