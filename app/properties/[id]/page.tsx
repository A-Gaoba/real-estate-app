import { Suspense } from "react"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Share2, ArrowLeft } from "lucide-react"
import { getPropertyById } from "@/lib/properties"
import { ImageGallery } from "@/components/ImageGallery"
import { PropertyDetails } from "@/components/PropertyDetails"
import { PropertyFeatures } from "@/components/PropertyFeatures"
import { PropertyContactForm } from "@/components/PropertyContactForm"
import { FavoriteButton } from "@/components/FavoriteButton"
import { currentUser } from "@clerk/nextjs/server"
import prisma from "@/lib/prisma"
import Link from "next/link"

export async function generateMetadata({ params }: { params: { id: string } }) {
  const property = await getPropertyById(params.id)

  if (!property) {
    return {
      title: "Property Not Found",
      description: "The requested property could not be found.",
    }
  }

  return {
    title: `${property.title} | Real Estate App`,
    description: property.description.substring(0, 160),
  }
}

export default async function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const property = await getPropertyById(params.id)

  if (!property) {
    notFound()
  }

  // Check if the property is saved by the current user
  let isSaved = false
  const user = await currentUser()

  if (user) {
    const dbUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        id: true,
        savedPropertyIds: true,
      },
    })

    if (dbUser) {
      isSaved = dbUser.savedPropertyIds.includes(property.id)
    }
  }

  // Extract bedrooms, bathrooms, and sqft from property data
  // In a real app, these would be proper fields in the database
  const bedrooms = property.features.some((f) => f.toLowerCase().includes("bedroom"))
    ? Number(property.features.find((f) => f.toLowerCase().includes("bedroom"))?.match(/\d+/)?.[0] || 0)
    : undefined

  const bathrooms = property.features.some((f) => f.toLowerCase().includes("bathroom"))
    ? Number(property.features.find((f) => f.toLowerCase().includes("bathroom"))?.match(/\d+/)?.[0] || 0)
    : undefined

  const sqft = property.features.some((f) => f.toLowerCase().includes("sqft"))
    ? Number(property.features.find((f) => f.toLowerCase().includes("sqft"))?.match(/\d+/)?.[0] || 0)
    : undefined

  return (
    <div className="space-y-8">
      {/* Back button */}
      <div>
        <Link href="/properties">
          <Button variant="ghost" className="pl-0">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Properties
          </Button>
        </Link>
      </div>

      {/* Property title and actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-3xl font-bold">{property.title}</h1>
        <div className="flex items-center gap-2">
          <FavoriteButton propertyId={property.id} isSaved={isSaved} />
          <Button variant="outline" size="icon">
            <Share2 className="h-4 w-4" />
            <span className="sr-only">Share property</span>
          </Button>
        </div>
      </div>

      {/* Image gallery */}
      <Suspense fallback={<div className="aspect-video w-full bg-muted animate-pulse rounded-lg" />}>
        <ImageGallery images={property.images} alt={property.title} />
      </Suspense>

      {/* Property details and contact form */}
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-8">
          {/* Property details */}
          <PropertyDetails
            property={{
              price: property.price,
              address: property.address,
              city: property.city,
              state: property.state,
              zip: property.zip,
              country: property.country,
              type: property.type,
              status: property.status,
              bedrooms,
              bathrooms,
              sqft,
              createdAt: property.createdAt,
            }}
          />

          {/* Description */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <p className="whitespace-pre-line">{property.description}</p>
          </div>

          <Separator />

          {/* Features */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Features</h2>
            <PropertyFeatures features={property.features} />
          </div>

          <Separator />

          {/* Location */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Location</h2>
            <div className="aspect-video w-full overflow-hidden rounded-lg bg-muted flex items-center justify-center">
              <p className="text-muted-foreground">Map will be displayed here</p>
            </div>
          </div>
        </div>

        {/* Contact form */}
        <div>
          <PropertyContactForm
            propertyId={property.id}
            propertyTitle={property.title}
            agentName={property.createdBy?.username || undefined}
            agentEmail={property.createdBy?.email || undefined}
          />
        </div>
      </div>
    </div>
  )
}
