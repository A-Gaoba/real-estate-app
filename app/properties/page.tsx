import { Button } from "@/components/ui/button"
import { PropertyCard } from "@/components/PropertyCard"
import { getAllProperties } from "@/lib/properties"

export default async function Properties() {
  // Fetch properties from the database
  const properties = await getAllProperties()

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Properties</h1>
        <Button>Filter</Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {properties.length > 0 ? (
          properties.map((property) => (
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
              featured={property.isFeatured}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No properties found. Check back later!</p>
          </div>
        )}
      </div>
    </div>
  )
}
