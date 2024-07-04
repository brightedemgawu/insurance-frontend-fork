import {auth} from "@/auth";
import {NextResponse} from "next/server";

const authenticatedRoutes = ["/dashboard"];
const unauthenticatedRoutes: string[] = ["/auth"];
export default auth((req) => {
    const {nextUrl} = req;
    const {pathname} = nextUrl;
    const isAuthenticated = !!req.auth;
    if (!isAuthenticated && authenticatedRoutes.some(route => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    if (isAuthenticated && unauthenticatedRoutes.some(route => pathname.startsWith(route))) {
        return NextResponse.redirect(new URL('/', req.url));
    }

})
