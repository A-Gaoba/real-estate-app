import { checkAgentRole } from "@/middleware/agent-auth"
import prisma from "@/lib/prisma"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus, Pencil } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import type { PropertyStatus } from "@prisma/client"
import { Badge } from "@/components/ui/badge"
import { DeletePropertyButton } from "@/components/dashboard/DeletePropertyButton"
import { EmptyState } from "@/components/EmptyState"

export default async function AgentDashboard() {
  // This will redirect if the user is not an agent
  const agent = await checkAgentRole()

  // Get all properties created by this agent
  const properties = await prisma.property.findMany({
    where: {
      userId: agent.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  // Get count of inquiries for each property
  const propertyIds = properties.map((property) => property.id)
  const inquiryCounts = await prisma.inquiry.groupBy({
    by: ["propertyId"],
    where: {
      propertyId: {
        in: propertyIds,
      },
    },
    _count: {
      id: true,
    },
  })

  // Create a map of property ID to inquiry count
  const inquiryCountMap = new Map()
  inquiryCounts.forEach((item) => {
    inquiryCountMap.set(item.propertyId, item._count.id)
  })

  // Get status badge variant
  const getStatusBadgeVariant = (status: PropertyStatus) => {
    switch (status) {
      case "AVAILABLE":
        return "default"
      case "PENDING":
        return "secondary"
      case "SOLD":
        return "destructive"
      case "RENTED":
        return "outline"
      default:
        return "default"
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Properties</h1>
          <p className="text-muted-foreground">Manage your property listings.</p>
        </div>
        <Button asChild>
          <Link href="/dashboard/agent/add">
            <Plus className="mr-2 h-4 w-4" />
            Add Property
          </Link>
        </Button>
      </div>

      {properties.length > 0 ? (
        <div className="rounded-md border">
          <div className="overflow-hidden">
            <table className="w-full caption-bottom text-sm">
              <thead className="border-b bg-muted/50">
                <tr>
                  <th className="h-12 px-4 text-left align-middle font-medium">Property</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Price</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Inquiries</th>
                  <th className="h-12 px-4 text-left align-middle font-medium">Featured</th>
                  <th className="h-12 px-4 text-right align-middle font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((property) => (
                  <tr key={property.id} className="border-b transition-colors hover:bg-muted/50">
                    <td className="p-4 align-middle">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 overflow-hidden rounded-md">
                          <img
                            src={property.images[0] || "/placeholder.svg?height=48&width=48"}
                            alt={property.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-medium">{property.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {property.city}, {property.state}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 align-middle">{formatPrice(property.price)}</td>
                    <td className="p-4 align-middle">
                      <Badge variant={getStatusBadgeVariant(property.status)}>
                        {property.status.charAt(0) + property.status.slice(1).toLowerCase()}
                      </Badge>
                    </td>
                    <td className="p-4 align-middle">{inquiryCountMap.get(property.id) || 0}</td>
                    <td className="p-4 align-middle">{property.isFeatured ? "Yes" : "No"}</td>
                    <td className="p-4 align-middle text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="icon" asChild>
                          <Link href={`/properties/${property.id}`}>
                            <span className="sr-only">View</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                          </Link>
                        </Button>
                        <Button variant="outline" size="icon" asChild>
                          <Link href={`/dashboard/agent/edit/${property.id}`}>
                            <span className="sr-only">Edit</span>
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
                        <DeletePropertyButton propertyId={property.id} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <EmptyState
          title="No properties found"
          description="You haven't created any properties yet. Add your first property to get started."
          link="/dashboard/agent/add"
          linkText="Add Property"
        />
      )}
    </div>
  )
}
