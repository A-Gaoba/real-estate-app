import { checkAdminRole } from "@/middleware/admin-auth"
import prisma from "@/lib/prisma"
import { formatDistanceToNow } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { formatPrice } from "@/lib/utils"
import type { PropertyStatus } from "@prisma/client"
import { PropertyApprovalActions } from "@/components/dashboard/PropertyApprovalActions"

export default async function AdminProperties() {
  // This will redirect if the user is not an admin
  await checkAdminRole()

  // Get all properties
  const properties = await prisma.property.findMany({
    include: {
      createdBy: {
        select: {
          username: true,
          email: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
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
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Properties</h1>
        <p className="text-muted-foreground">Manage property listings.</p>
      </div>

      <div className="rounded-md border">
        <div className="overflow-hidden">
          <table className="w-full caption-bottom text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="h-12 px-4 text-left align-middle font-medium">Property</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Price</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Status</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Agent</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Added</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Approved</th>
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
                  <td className="p-4 align-middle">{property.createdBy.username || property.createdBy.email}</td>
                  <td className="p-4 align-middle">
                    {formatDistanceToNow(new Date(property.createdAt), { addSuffix: true })}
                  </td>
                  <td className="p-4 align-middle">
                    <Badge variant={property.isApproved ? "default" : "destructive"}>
                      {property.isApproved ? "Yes" : "No"}
                    </Badge>
                  </td>
                  <td className="p-4 align-middle text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/properties/${property.id}`}>View</Link>
                      </Button>
                      <PropertyApprovalActions property={property} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
