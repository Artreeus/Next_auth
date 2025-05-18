// middleware.js (or your middleware file)

export { default } from "next-auth/middleware";

export const config = {
  matcher: ['/dashboard/:path*'], // This will match all routes under /dashboard
};
