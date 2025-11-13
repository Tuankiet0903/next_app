import { withAuth } from "next-auth/middleware";

export default withAuth(
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
