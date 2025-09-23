export { default } from "next-auth/middleware";

// Protect everything EXCEPT sign-in, NextAuth API and static assets
export const config = {
  matcher: [
    "/((?!api/auth|sign-in|_next/static|_next/image|favicon.ico|images|public).*)",
  ],
};
