import Link from "next/link";
import {cn} from "@/lib/utils";
import {buttonStyleVariants} from "@/components/Button/buttonStyleVariants";
import {LockKeyhole} from "lucide-react";
import AccessLevelTable from "@/app/dashboard/settings/access-level/_components/AccessLevelTable";

export default function Page() {
    return (
        <>
            <main
                className="w-full rounded-md    p-4 bg-gray-white"
            >

                <div
                    className={"w-full flex justify-between items-center"}
                >
                    <p
                        className={"text-gray-black font-medium text-[1.1rem]"}
                    >Access Level <span>(89)</span></p>
                    <Link
                        className={cn(buttonStyleVariants())}
                        href={"/"}>
                        <LockKeyhole
                            size={18}
                        />
                        Add Access Level
                    </Link>
                </div>

                <AccessLevelTable/>


            </main>
            <div
                className={"w-full h-[20px]"}
            >

            </div>
        </>
    )
}
