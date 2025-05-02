import { authMiddleware, clerkClient } from "@clerk/nextjs"
import { NextResponse } from "next/server"

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
  publicRoutes: [
    "/",
    "/properties",
    "/properties/(.*)",
    "/about",
    "/contact",
    "/api/webhook/clerk",
    "/api/properties",
    "/api/properties/(.*)",
  ],
  async afterAuth(auth, req) {
    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      const signInUrl = new URL("/sign-in", req.url)
      signInUrl.searchParams.set("redirect_url", req.url)
      return NextResponse.redirect(signInUrl)
    }

    // If the user is logged in and trying to access a protected route,
    // check if they have the required role for admin routes
    if (auth.userId && req.nextUrl.pathname.startsWith("/admin")) {
      const user = await clerkClient.users.getUser(auth.userId)

      // Check if user has admin role
      if (user?.publicMetadata?.role !== "admin") {
        // Redirect to dashboard if they're not an admin
        return NextResponse.redirect(new URL("/dashboard", req.url))
      }
    }

    // If the user is logged in and trying to access agent-only routes
    if (auth.userId && req.nextUrl.pathname.startsWith("/agent")) {
      const user = await clerkClient.users.getUser(auth.userId)

      // Check if user has agent or admin role
      if (user?.publicMetadata?.role !== "agent" && user?.publicMetadata?.role !== "admin") {
        // Redirect to dashboard if they're not an agent or admin
        return NextResponse.redirect(new URL("/dashboard", req.url))
      }
    }

    return NextResponse.next()
  },
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
