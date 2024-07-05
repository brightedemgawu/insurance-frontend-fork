import UserAvatar from "@/components/Auth/UserAvatar";
import {Group} from "lucide-react";

export default function NavBarUserMenu() {
    const user: { email: string, name: string, imageUrl?: string } = {
        email: 'brightedemgawu@gmail.com',
        name: 'Bright Edem Gawu'
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
                >Bright Edem Gawu</p>
                <p
                    className={"text-[10px] text-gray-600  "}
                >HR Manager</p>
            </div>
            <Group
                size={20}
                className={"text-primary-text"}
            />

        </div>

    )
}
