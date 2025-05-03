import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ProfileForm } from "@/components/dashboard/ProfileForm"

export default async function Profile() {
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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">Manage your profile information.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your profile information.</CardDescription>
        </CardHeader>
        <CardContent>
          <ProfileForm user={dbUser} />
        </CardContent>
      </Card>
    </div>
  )
}
