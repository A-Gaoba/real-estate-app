"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Heart, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Mock data for saved properties
const mockSavedProperties = [
  {
    id: "2",
    title: "Spacious Family Home",
    price: 550000,
    location: "Suburbia, California",
    bedrooms: 4,
    bathrooms: 3,
    area: 2400,
    type: "house",
    status: "for-sale",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "3",
    title: "Luxury Penthouse",
    price: 1200000,
    location: "Marina District, San Francisco",
    bedrooms: 3,
    bathrooms: 3.5,
    area: 2800,
    type: "condo",
    status: "for-sale",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "7",
    title: "Downtown Loft",
    price: 2500,
    location: "Chicago, Illinois",
    bedrooms: 1,
    bathrooms: 1,
    area: 950,
    type: "apartment",
    status: "for-rent",
    image: "/placeholder.svg?height=300&width=400",
    rentPeriod: "month",
  },
]

export default function SavedProperties() {
  const { toast } = useToast()
  const [savedProperties, setSavedProperties] = useState(mockSavedProperties)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading properties
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleRemoveProperty = async (propertyId: string) => {
    try {
      // In a real app, this would call a server action to toggle saved status
      // await toggleSaveProperty(propertyId)

      // For demo purposes, we'll just update the local state
      setSavedProperties((prev) => prev.filter((p) => p.id !== propertyId))

      toast({
        title: "Property removed",
        description: "Property removed from your saved list",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove property. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="h-[200px] w-full" />
            <CardContent className="p-4">
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-6 w-1/2 mb-4" />
              <div className="flex justify-between mb-2">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-1/4" />
              </div>
              <Skeleton className="h-4 w-full mt-4" />
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (savedProperties.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
          <Heart className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No saved properties</h3>
        <p className="text-muted-foreground mb-6">You haven't saved any properties yet</p>
        <Button asChild>
          <Link href="/properties">Browse Properties</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {savedProperties.map((property) => (
        <Card key={property.id} className="overflow-hidden group">
          <div className="relative">
            <img
              src={property.image || "/placeholder.svg"}
              alt={property.title}
              className="h-[200px] w-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute top-2 right-2">
              <Button
                variant="ghost"
                size="icon"
                className="bg-background/80 backdrop-blur-sm hover:bg-background/90"
                onClick={() => handleRemoveProperty(property.id)}
              >
                <Trash2 className="h-5 w-5 text-red-500" />
                <span className="sr-only">Remove property</span>
              </Button>
            </div>
            <Badge className="absolute top-2 left-2" variant={property.status === "for-rent" ? "secondary" : "default"}>
              {property.status === "for-rent"
                ? `For Rent $${property.price}/mo`
                : `For Sale $${property.price.toLocaleString()}`}
            </Badge>
          </div>

          <CardContent className="p-4">
            <h3 className="font-semibold text-lg mb-1 line-clamp-1">{property.title}</h3>
            <p className="text-muted-foreground text-sm mb-3">{property.location}</p>
            <div className="flex justify-between text-sm">
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground"
                >
                  <path d="M3 22v-2c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v2H3Z" />
                  <path d="M15 22v-2c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v2h-6Z" />
                  <path d="M3 10v2c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-2H3Z" />
                  <path d="M15 10v2c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-2h-6Z" />
                  <rect x="3" y="2" width="6" height="8" rx="2" />
                  <rect x="15" y="2" width="6" height="8" rx="2" />
                </svg>
                <span>{property.bedrooms} Beds</span>
              </div>
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground"
                >
                  <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
                  <line x1="10" x2="8" y1="5" y2="7" />
                  <line x1="2" x2="22" y1="12" y2="12" />
                  <line x1="7" x2="7" y1="19" y2="21" />
                  <line x1="17" x2="17" y1="19" y2="21" />
                </svg>
                <span>{property.bathrooms} Baths</span>
              </div>
              <div className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground"
                >
                  <rect width="20" height="14" x="2" y="7" rx="2" />
                  <path d="M16 21V7" />
                  <path d="M8 21V7" />
                </svg>
                <span>{property.area} sqft</span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0">
            <Button asChild className="w-full">
              <Link href={`/properties/${property.id}`}>View Details</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
