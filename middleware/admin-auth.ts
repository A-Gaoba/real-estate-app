import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"

export async function checkAdminRole() {
  const user = await currentUser()

  if (!user) {
    redirect("/sign-in")
  }

  // Get user from database
  const dbUser = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
  })

  if (!dbUser) {
    redirect("/")
  }

  // Check if user has admin role
  if (dbUser.role !== "ADMIN") {
    redirect("/dashboard")
  }

  return dbUser
}
