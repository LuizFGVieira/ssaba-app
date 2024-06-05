import type { NextRequest } from "next/server";

const publicRoutes = ["/"];
const privateRoutes = ["/dashboard", "/person", "/home", "/users", "/outputs"];
export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("user-token");

  if (
    !currentUser &&
    privateRoutes.some((route) => request.nextUrl.pathname.startsWith(route))
  ) {
    return Response.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
