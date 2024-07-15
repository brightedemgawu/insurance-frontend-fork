import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import AppLogo from "@/components/constants/AppLogo/AppLogo";

export default function AuthLayout({children}: { children: React.ReactNode }) {
    return (
        <MaxWidthWrapper
        className=" bg-gray-white md:bg-gray-100"
        >
            <div
                className="w-full  h-screen"
            >
                <nav
                    className={"w-full h-[70px] flex items-end"}
                >
                    <AppLogo/>
                </nav>
                <div
                    className={"w-full flex justify-center items-center mt-4 h-[80vh]"}
                >
                    {children}
                </div>
            </div>
        </MaxWidthWrapper>
    )
}
