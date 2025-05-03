import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bed, Bath, Square, MapPin } from "lucide-react"
import { formatPrice } from "@/lib/utils"

interface PropertyCardProps {
  property: {
    id: string
    title: string
    price: number
    address: string
    city: string
    state: string
    images: string[]
    features: string[]
    bedrooms?: number
    bathrooms?: number
    sqft?: number
  }
  featured?: boolean
}

export function PropertyCard({ property, featured = false }: PropertyCardProps) {
  // Extract bedrooms, bathrooms, and sqft from features if they exist and aren't already provided
  const bedrooms =
    property.bedrooms !== undefined
      ? property.bedrooms
      : property.features.some((f) => f.toLowerCase().includes("bedroom"))
        ? Number(property.features.find((f) => f.toLowerCase().includes("bedroom"))?.match(/\d+/)?.[0] || 0)
        : undefined

  const bathrooms =
    property.bathrooms !== undefined
      ? property.bathrooms
      : property.features.some((f) => f.toLowerCase().includes("bathroom"))
        ? Number(property.features.find((f) => f.toLowerCase().includes("bathroom"))?.match(/\d+/)?.[0] || 0)
        : undefined

  const sqft =
    property.sqft !== undefined
      ? property.sqft
      : property.features.some((f) => f.toLowerCase().includes("sqft"))
        ? Number(property.features.find((f) => f.toLowerCase().includes("sqft"))?.match(/\d+/)?.[0] || 0)
        : undefined

  return (
    <Card className={`overflow-hidden ${featured ? "border-primary/50" : ""}`}>
      <div className="aspect-video w-full overflow-hidden relative">
        <img
          src={property.images[0] || "/placeholder.svg?height=300&width=400"}
          alt={property.title}
          className="h-full w-full object-cover transition-all hover:scale-105"
        />
        {featured && (
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 text-xs font-medium rounded">
            Featured
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle className="line-clamp-1">{property.title}</CardTitle>
        <p className="text-2xl font-bold">{formatPrice(property.price)}</p>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          {bedrooms !== undefined && (
            <div className="flex items-center">
              <Bed className="h-4 w-4 mr-1" />
              <span>{bedrooms}</span>
            </div>
          )}
          {bathrooms !== undefined && (
            <div className="flex items-center">
              <Bath className="h-4 w-4 mr-1" />
              <span>{bathrooms}</span>
            </div>
          )}
          {sqft !== undefined && (
            <div className="flex items-center">
              <Square className="h-4 w-4 mr-1" />
              <span>{sqft} sqft</span>
            </div>
          )}
        </div>
        <p className="text-sm text-muted-foreground flex items-center">
          <MapPin className="h-4 w-4 mr-1" />
          {property.address}, {property.city}, {property.state}
        </p>
      </CardContent>
      <CardFooter>
        <Link href={`/properties/${property.id}`} className="w-full">
          <Button className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
