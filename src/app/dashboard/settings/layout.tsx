import {ReactNode} from "react";
import CustomBreadCrumb from "@/components/CustomBreadCrumb";
import {Separator} from "@/components/ui/separator";
import {SettingsLayoutLinks} from "@/constants/links/dashboard-links";
import LayoutLink from "@/app/dashboard/settings/_components/LayoutLink";

export default function SettingsLayout({children}: { children: ReactNode }) {
    return (
        <div
            className={"w-full"}
        >
            <div
                className="flex items-center gap-2"
            >
                <h4
                    className={"font-[600] text-gray-black text-[2rem] "}
                >
                    Settings
                </h4>
                <CustomBreadCrumb basePath={"/dashboard/settings"}/>
            </div>
            <p
                className={"font-[400] text-gray-text-caption text-[.9rem] "}
            >
                Configure your settings here.
            </p>

            <Separator className={"w-full bg-gray-300 my-4"}/>

            <div
                className={"w-full mb-6 flex no-scrollbar items-center max-w-full overflow-y-hidden overflow-x-scroll "}
            >
                {
                    SettingsLayoutLinks.map((link, index) => {
                        return (
                            <LayoutLink key={index} link={link}/>
                        )
                    })
                }


            </div>

            {children}
            <div
                className={"w-full h-[20px]"}
            >

            </div>
        </div>
    )
}
