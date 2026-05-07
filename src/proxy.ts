import { type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
   // const { nextUrl } = request;
   // const pathname = nextUrl.pathname;


   // const token = useAuthStore.getState().getToken();
   // const isLoggedIn = !!token;

   // const isPublicRoute = publicRoutes.includes(pathname);
   // const isAuthRoute = authRoutes.includes(pathname);

   // if (isAuthRoute && isLoggedIn) {
   //    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
   // }

   // if (!isLoggedIn && !isPublicRoute && !isAuthRoute) {
   //    return NextResponse.redirect(new URL("/", nextUrl));
   // }

   // return NextResponse.next();
}

export const config = {
   matcher: ["/((?!_next/static|_next/image|favicon.ico).*)", "/api/:path*"],
};
