import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    // Add any additional middleware logic here if needed
  },
  {
    callbacks: {
      authorized({ token, req }) {
        // If there's a token => user is logged in
        const isLoggedIn = !!token;

        // Public paths
        const publicPaths = ["/", "/login", "/register"];
        const path = req.nextUrl.pathname;

        // Allow public paths
        if (publicPaths.includes(path)) {
          return true;
        }

        // Require login for non-public paths
        return isLoggedIn;
      },
    },
  }
);

// Configure matcher to apply to all except static/api/_next...
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
