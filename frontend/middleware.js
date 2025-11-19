import { auth } from "./auth";
import { NextResponse } from "next/server";

export default auth((req) => {
    const isLoggedIn = !!req.auth;
    const isOnboarded = req.auth?.user?.isOnboarded === 1;
    const isAuthPage = req.nextUrl.pathname.startsWith("/auth");
    const isOnboardingPage = req.nextUrl.pathname === "/onboarding";
    const isApiAuthRoute = req.nextUrl.pathname.startsWith("/api/auth");
    const isPublicPage = req.nextUrl.pathname === "/";

    // Allow API auth routes and public page
    if (isApiAuthRoute || isPublicPage) {
        return null;
    }

    if (isAuthPage) {
        if (isLoggedIn) {
            return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
        }
        return null;
    }

    if (!isLoggedIn) {
        return NextResponse.redirect(new URL("/auth/signin", req.nextUrl));
    }

    if (isLoggedIn && !isOnboarded && !isOnboardingPage) {
        return NextResponse.redirect(new URL("/onboarding", req.nextUrl));
    }

    if (isLoggedIn && isOnboarded && isOnboardingPage) {
        return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }

    return null;
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
