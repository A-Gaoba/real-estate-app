import { checkAgentRole } from "@/middleware/agent-auth"
import { PropertyForm } from "@/components/dashboard/PropertyForm"

export default async function AddProperty() {
  // This will redirect if the user is not an agent
  await checkAgentRole()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add Property</h1>
        <p className="text-muted-foreground">Create a new property listing.</p>
      </div>

      <PropertyForm />
    </div>
  )
}
