/* 
Keep UX in mind. !important

This file will look at the cookies 
too see if there is an access token.

If there is a valid non expired access token 
and if the user requests to go to
'/login' or '/register' then 
redirect them to '/'

If there is no access token or if it is expired or if it is invalid.
Go to /refresh-token to create a new access token
using the refresh token.

If the refresh token was valid but is expired 
redirect to /login to prompt the user to login
with a message saying: 'Session has epired'

Basically every other scenario...
If the refresh token is invalid or does not exist
then show unathenticated home page/site

*/
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const supachatAccessToken = cookieStore.get("supachatAccessToken")?.value;
  const supachatRefreshToken = cookieStore.get("supachatRefreshToken")?.value;

  const response = await fetch("http://localhost:5432/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      supachatAccessToken: `${supachatAccessToken}`,
      supachatRefreshToken: `${supachatRefreshToken}`,
    },
  });

  const { data } = await response.json();
  if (data.user) {
    if (
      request.nextUrl.pathname.startsWith("/login") ||
      request.nextUrl.pathname.startsWith("/register")
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
