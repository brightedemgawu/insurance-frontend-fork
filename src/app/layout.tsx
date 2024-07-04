import type {Metadata} from "next";
import {Inter} from "next/font/google";
import {Toaster} from "sonner";
import "./globals.css";
import ReduxProvider from "@/providers/ReduxProvider";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Seven Group Insurance",
    description: "Secure Your Future With Us.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <ReduxProvider>
            {children}
        </ReduxProvider>
        <Toaster/>
        </body>
        </html>
    );
}
