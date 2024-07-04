import {cva, VariantProps} from "class-variance-authority";
import {cn} from "@/lib/utils";
import {appLogo} from "../../../../public";
import Image from "next/image";
import Link from "next/link";

export const AppLogoStyleVariants = cva(
    "",
    {
        variants: {
            variant: {
                "default": "",
                "sm": ""
            },
        },
        defaultVariants: {
            variant: "default"
        }
    }
)

type AppLogoProps = VariantProps<typeof AppLogoStyleVariants> & {
    className?: string,
    iconOnly?: boolean
}

export default function AppLogo({className, iconOnly}: AppLogoProps) {
    return (
        <Link
            href={"/"}
            className={
                cn(
                    "flex flex-row items-center gap-[0.2em] ",
                    className
                )}
        >
            <Image
                src={appLogo}
                alt="app logo"
                width={60}
                height={60}
                priority
                className="w-[40px] h-[40px]"
            />
            {!iconOnly &&
                <div
                    className="text-gray-text tracking-wider font-bold text-[15px] flex flex-col  justify-start gap-0 "
                >
                    <span>
                        SEVEN GROUP
                    </span>
                    <span
                        className="font-medium mt-[-4px] text-[12px] text-gray-text-caption "
                    >
                        INSURANCE
                </span>
                </div>
            }
        </Link>
    )
}
