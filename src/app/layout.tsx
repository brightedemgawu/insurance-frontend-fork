import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {Toaster} from "sonner";
import "./globals.css";
import ReduxProvider from "@/providers/ReduxProvider";
import {getAuthenticatedUser} from "@/actions/getAuthenticatedUser";
import SetAuthUser from "@/app/_components/SetAuthUser";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Seven Group Insurance",
    description: "Secure Your Future With Us.",
};

export default async function RootLayout({
                                             children,
                                         }: Readonly<{
    children: React.ReactNode;
}>) {
    const user = await getAuthenticatedUser();
    return (
        <html lang="en">
        <body className={inter.className}>
        <ReduxProvider>
            {children}
            <SetAuthUser user={user}/>
        </ReduxProvider>
        <Toaster/>
        </body>
        </html>
    );
}
