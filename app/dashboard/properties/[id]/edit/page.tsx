import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import PropertyForm from "@/components/property-form"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

interface EditPropertyPageProps {
  params: {
    id: string
  }
}

export default async function EditPropertyPage({ params }: EditPropertyPageProps) {
  const { userId } = auth()

  if (!userId) {
    redirect("/sign-in")
  }

  // In a real app, fetch the property from the database
  // For demo purposes, we'll use mock data
  const property = {
    id: params.id,
    title: "Modern Apartment with City View",
    description: "This beautiful modern apartment offers stunning city views and is located in the heart of downtown.",
    price: 350000,
    address: "123 Main Street",
    city: "New York",
    state: "NY",
    country: "USA",
    zipCode: "10001",
    type: "APARTMENT",
    status: "FOR_SALE",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    features: ["pool", "garage", "airConditioning", "balcony"],
    images: [
      "/placeholder.svg?height=600&width=800&text=Image 1",
      "/placeholder.svg?height=600&width=800&text=Image 2",
    ],
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Edit Property</CardTitle>
          <CardDescription>Update the details of your property listing</CardDescription>
        </CardHeader>
        <CardContent>
          <PropertyForm property={property} mode="edit" />
        </CardContent>
      </Card>
    </div>
  )
}
