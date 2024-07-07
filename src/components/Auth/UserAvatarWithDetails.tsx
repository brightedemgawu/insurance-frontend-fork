import {cn, formatUserEmail, formatUserName} from "@/lib/utils";
import UserAvatar from "@/components/Auth/UserAvatar";

type UserAvatarWithDetailsProps = {
    user: { email: string, imageUrl?: string, name?: string }
    avatarClassName?: string,
    nameClassName?: string,
    emailClassName?: string,
}

export default function UserAvatarWithDetails({
                                                  user,
                                                  emailClassName,
                                                  avatarClassName,
                                                  nameClassName
                                              }: UserAvatarWithDetailsProps) {
    return (
        <div
            className="w-full flex items-center gap-2 p-0"
        >
            <UserAvatar
                className={cn("size-[55px]", avatarClassName)}
                user={user}
            />

            <div>
                <p className={cn("text-[1rem] font-medium text-gray-text ", nameClassName)}>{formatUserName(user?.name)}</p>
                <p className={cn("text-[11px] text-gray-text font-normal", emailClassName)}>{formatUserEmail(user?.email)}</p>
            </div>
        </div>
    )
}
