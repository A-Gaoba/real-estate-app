import { checkAgentRole } from "@/middleware/agent-auth"
import { PropertyForm } from "@/components/dashboard/PropertyForm"
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"

export default async function EditProperty({ params }: { params: { id: string } }) {
  // This will redirect if the user is not an agent
  const agent = await checkAgentRole()

  // Get the property
  const property = await prisma.property.findUnique({
    where: {
      id: params.id,
    },
  })

  // Check if property exists and belongs to this agent
  if (!property || property.userId !== agent.id) {
    notFound()
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Property</h1>
        <p className="text-muted-foreground">Update your property listing.</p>
      </div>

      <PropertyForm property={property} />
    </div>
  )
}
