import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { formatPrice } from "@/lib/utils"
import { Bed, Bath, Square, MapPin, Calendar, Home } from "lucide-react"

interface PropertyDetailsProps {
  property: {
    price: number
    address: string
    city: string
    state: string
    zip: string
    country: string
    type: string
    status: string
    bedrooms?: number
    bathrooms?: number
    sqft?: number
    createdAt: Date
  }
}

export function PropertyDetails({ property }: PropertyDetailsProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date(date))
  }

  // Format property type for display
  const formatPropertyType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()
  }

  // Format property status for display and determine badge color
  const formatPropertyStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()
  }

  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "AVAILABLE":
        return "default" // green
      case "PENDING":
        return "secondary" // yellow
      case "SOLD":
        return "destructive" // red
      case "RENTED":
        return "outline" // gray
      default:
        return "default"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-3xl font-bold">{formatPrice(property.price)}</h2>
        <Badge variant={getBadgeVariant(property.status)}>{formatPropertyStatus(property.status)}</Badge>
      </div>

      <p className="flex items-center text-muted-foreground">
        <MapPin className="mr-2 h-4 w-4" />
        {property.address}, {property.city}, {property.state} {property.zip}, {property.country}
      </p>

      <Card>
        <CardContent className="grid grid-cols-2 gap-4 p-6 sm:grid-cols-4">
          {property.bedrooms !== undefined && (
            <div className="flex flex-col items-center justify-center">
              <Bed className="mb-2 h-5 w-5 text-primary" />
              <span className="text-lg font-semibold">{property.bedrooms}</span>
              <span className="text-xs text-muted-foreground">Bedrooms</span>
            </div>
          )}
          {property.bathrooms !== undefined && (
            <div className="flex flex-col items-center justify-center">
              <Bath className="mb-2 h-5 w-5 text-primary" />
              <span className="text-lg font-semibold">{property.bathrooms}</span>
              <span className="text-xs text-muted-foreground">Bathrooms</span>
            </div>
          )}
          {property.sqft !== undefined && (
            <div className="flex flex-col items-center justify-center">
              <Square className="mb-2 h-5 w-5 text-primary" />
              <span className="text-lg font-semibold">{property.sqft.toLocaleString()}</span>
              <span className="text-xs text-muted-foreground">Square Feet</span>
            </div>
          )}
          <div className="flex flex-col items-center justify-center">
            <Home className="mb-2 h-5 w-5 text-primary" />
            <span className="text-lg font-semibold">{formatPropertyType(property.type)}</span>
            <span className="text-xs text-muted-foreground">Property Type</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Calendar className="mb-2 h-5 w-5 text-primary" />
            <span className="text-lg font-semibold">{formatDate(property.createdAt)}</span>
            <span className="text-xs text-muted-foreground">Listed Date</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
