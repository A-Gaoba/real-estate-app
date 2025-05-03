import { checkAgentRole } from "@/middleware/agent-auth"
import prisma from "@/lib/prisma"
import { formatDistanceToNow } from "date-fns"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { EmptyState } from "@/components/EmptyState"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MarkInquiryButton } from "@/components/dashboard/MarkInquiryButton"

export default async function AgentInquiries() {
  // This will redirect if the user is not an agent
  const agent = await checkAgentRole()

  // Get all properties created by this agent
  const properties = await prisma.property.findMany({
    where: {
      userId: agent.id,
    },
    select: {
      id: true,
    },
  })

  const propertyIds = properties.map((property) => property.id)

  // Get all inquiries for these properties
  const inquiries = await prisma.inquiry.findMany({
    where: {
      propertyId: {
        in: propertyIds,
      },
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
        <h1 className="text-3xl font-bold tracking-tight">Property Inquiries</h1>
        <p className="text-muted-foreground">Manage inquiries for your properties.</p>
      </div>

      {inquiries.length > 0 ? (
        <div className="grid gap-6">
          {inquiries.map((inquiry) => (
            <Card key={inquiry.id} className={inquiry.isRead ? "" : "border-primary"}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{inquiry.property.title}</CardTitle>
                  <Badge>{formatDistanceToNow(new Date(inquiry.createdAt), { addSuffix: true })}</Badge>
                </div>
                <CardDescription>
                  From: {inquiry.name} ({inquiry.email}){inquiry.phone && ` • ${inquiry.phone}`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-line">{inquiry.message}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" asChild>
                  <Link href={`/properties/${inquiry.property.id}`}>View Property</Link>
                </Button>
                <MarkInquiryButton inquiryId={inquiry.id} isRead={inquiry.isRead} />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No inquiries"
          description="You haven't received any inquiries for your properties yet."
          link="/dashboard/agent"
          linkText="View My Properties"
        />
      )}
    </div>
  )
}
