import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default async function Settings() {
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
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>Configure how you receive notifications.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications" className="flex flex-col space-y-1">
              <span>Email Notifications</span>
              <span className="font-normal text-sm text-muted-foreground">
                Receive email notifications about property updates.
              </span>
            </Label>
            <Switch id="email-notifications" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="marketing-emails" className="flex flex-col space-y-1">
              <span>Marketing Emails</span>
              <span className="font-normal text-sm text-muted-foreground">
                Receive emails about new properties and promotions.
              </span>
            </Label>
            <Switch id="marketing-emails" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>Manage your account settings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="public-profile" className="flex flex-col space-y-1">
              <span>Public Profile</span>
              <span className="font-normal text-sm text-muted-foreground">
                Make your profile visible to other users.
              </span>
            </Label>
            <Switch id="public-profile" defaultChecked />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
