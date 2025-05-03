import type React from "react"
import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { DashboardNav } from "@/components/dashboard/DashboardNav"
import prisma from "@/lib/prisma"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await currentUser()

  if (!user) {
    redirect("/sign-in")
  }

  // Check if user exists in our database
  let dbUser = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
  })

  // If not, create a new user
  if (!dbUser) {
    const email = user.emailAddresses[0]?.emailAddress
    if (!email) {
      throw new Error("User email not found")
    }

    const username =
      user.username ||
      (user.firstName && user.lastName ? `${user.firstName}${user.lastName}` : user.firstName || "user")

    dbUser = await prisma.user.create({
      data: {
        clerkId: user.id,
        email,
        username,
      },
    })
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <DashboardNav user={dbUser} />
        </aside>
        <main className="flex w-full flex-col overflow-hidden">{children}</main>
      </div>
    </div>
  )
}
