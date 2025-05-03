import { currentUser } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import { PropertyCard } from "@/components/PropertyCard"
import { EmptyState } from "@/components/EmptyState"

export default async function SavedProperties() {
  const user = await currentUser()

  if (!user) {
    redirect("/sign-in")
  }

  // Get user from database with saved properties
  const dbUser = await prisma.user.findUnique({
    where: {
      clerkId: user.id,
    },
    include: {
      savedProperties: true,
    },
  })

  if (!dbUser) {
    redirect("/")
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Saved Properties</h1>
        <p className="text-muted-foreground">Properties you've saved for later.</p>
      </div>

      {dbUser.savedProperties.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {dbUser.savedProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={{
                id: property.id,
                title: property.title,
                price: property.price,
                address: property.address,
                city: property.city,
                state: property.state,
                images: property.images,
                features: property.features,
              }}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No saved properties"
          description="You haven't saved any properties yet. Browse properties and click the heart icon to save them for later."
          link="/properties"
          linkText="Browse Properties"
        />
      )}
    </div>
  )
}
