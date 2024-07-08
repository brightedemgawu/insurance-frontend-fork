import {LockKeyhole} from "lucide-react";
import AccessLevelTable from "@/app/dashboard/settings/access-level/_components/AccessLevelTable";
import {getAuthenticatedUser} from "@/actions/getAuthenticatedUser";
import {UserTypes} from "@/types/authentication";
import Link from "next/link";
import {cn} from "@/lib/utils";
import {buttonStyleVariants} from "@/components/Button/buttonStyleVariants";

export default async function Page() {

    const user = await getAuthenticatedUser();
    return (
        <>
            <main
                className="w-full rounded-md    p-4 bg-gray-white"
            >
                <div
                    className={"w-full flex justify-between items-center"}
                >
                    <p
                        className={"text-gray-black font-medium text-[.9rem] md:text-[1.1rem]"}
                    >Access Level </p>

                    {user && (user.userType === UserTypes.Admin || user.accessLevel?.permissions?.manage_access_levels) &&

                        <Link
                            className={cn(buttonStyleVariants({className: "text-[.8rem]  md:text-[1rem]"}))}
                            href={"/dashboard/settings/access-level/create"}>
                            <LockKeyhole
                                size={18}
                            />
                            Create Access Level
                        </Link>
                    }
                </div>
                <AccessLevelTable/>
            </main>

        </>
    )
}
