import {cn} from "@/lib/utils";
import Image from "next/image";

type UserAvatarProps = {
    user: { email: string, photo?: string | null },
    containerClassName?: string;
    className?: string,
    disableBeep?: boolean
}

export default function UserAvatar({user, className, containerClassName, disableBeep}: UserAvatarProps) {
    return (
        <div className={cn("relative inline-block", containerClassName)}>

            {user.photo && user.photo !== "" ? (
                    <Image
                        width="200"
                        height="200"
                        className={cn("inline-block size-[45px] rounded-full", className)}
                        src={user.photo}
                        alt="Image Description"/>)
                : (<
                    div
                    className={cn("flex size-[45px] bg-gray-200 rounded-full justify-center items-center text-gray-text font-medium",
                        className)}
                >
                    {user.email.slice(0, 2).toUpperCase()}
                </div>)
            }
            {!disableBeep && <>
            
            <span
                className="absolute animate-ping bottom-0 end-0 block size-3 rounded-full ring-2 ring-primary-300 bg-primary-500 "></span>
                <span
                    className="absolute  bottom-0 end-0 block size-3 rounded-full ring-2 ring-primary-300 bg-primary-500 "></span>
            </>}
        </div>
    )
}
