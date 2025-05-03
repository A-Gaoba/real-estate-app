import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import { formatDistanceToNow } from "date-fns"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { EmptyState } from "@/components/EmptyState"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function Inquiries() {
  const user = await currentUser()

  if (!user) {
    redirect("/sign-in")
  }

  // Get user from database with inquiries
  const dbUser = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
  })

  if (!dbUser) {
    redirect("/")
  }

  // Get user inquiries with property details
  const inquiries = await prisma.inquiry.findMany({
    where: {
      userId: dbUser.id,
    },
    include: {
      property: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Inquiries</h1>
        <p className="text-muted-foreground">Property inquiries you've sent.</p>
      </div>

      {inquiries.length > 0 ? (
        <div className="grid gap-6">
          {inquiries.map((inquiry) => (
            <Card key={inquiry.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{inquiry.property.title}</CardTitle>
                  <Badge>{formatDistanceToNow(new Date(inquiry.createdAt), { addSuffix: true })}</Badge>
                </div>
                <CardDescription>
                  {inquiry.property.address}, {inquiry.property.city}, {inquiry.property.state}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">{inquiry.message}</p>
              </CardContent>
              <CardFooter>
                <Link href={`/properties/${inquiry.property.id}`} className="w-full">
                  <Button variant="outline" className="w-full">
                    View Property
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No inquiries"
          description="You haven't sent any property inquiries yet. Browse properties and contact agents to make inquiries."
          link="/properties"
          linkText="Browse Properties"
        />
      )}
    </div>
  )
}
