import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, MessageSquare, User, Building } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function Dashboard() {
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

  // Get saved properties count
  const savedPropertiesCount = dbUser.savedPropertyIds.length

  // Get inquiries count
  const inquiriesCount = await prisma.inquiry.count({
    where: {
      userId: dbUser.id,
    },
  })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, {user.firstName || user.username || "User"}!</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saved Properties</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{savedPropertiesCount}</div>
            <p className="text-xs text-muted-foreground">Properties you've saved for later</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inquiries</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inquiriesCount}</div>
            <p className="text-xs text-muted-foreground">Property inquiries you've sent</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Account</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dbUser.username || "User"}</div>
            <p className="text-xs text-muted-foreground">{dbUser.email}</p>
          </CardContent>
        </Card>
      </div>

      {dbUser.role !== "AGENT" && (
        <div className="bg-muted/50 rounded-lg p-6 mt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="space-y-2">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <Building className="h-5 w-5" />
                Become an Agent
              </h2>
              <p className="text-muted-foreground">
                Want to list properties? Become an agent to create and manage property listings.
              </p>
            </div>
            <Button asChild>
              <Link href="/dashboard/promote-to-agent">Become an Agent</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
