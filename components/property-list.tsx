"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { useUser } from "@clerk/nextjs"
import { useToast } from "@/components/ui/use-toast"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Skeleton } from "@/components/ui/skeleton"

// Mock data for properties
const mockProperties = [
  {
    id: "1",
    title: "Modern Apartment with City View",
    price: 350000,
    location: "Downtown, New York",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    type: "apartment",
    status: "for-sale",
    image: "/placeholder.svg?height=300&width=400",
  },
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
    id: "4",
    title: "Cozy Studio for Rent",
    price: 1800,
    location: "Brooklyn, New York",
    bedrooms: 1,
    bathrooms: 1,
    area: 650,
    type: "apartment",
    status: "for-rent",
    image: "/placeholder.svg?height=300&width=400",
    rentPeriod: "month",
  },
  {
    id: "5",
    title: "Waterfront Condo",
    price: 750000,
    location: "Miami Beach, Florida",
    bedrooms: 2,
    bathrooms: 2,
    area: 1500,
    type: "condo",
    status: "for-sale",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "6",
    title: "Mountain View Cabin",
    price: 450000,
    location: "Aspen, Colorado",
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    type: "house",
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
  {
    id: "8",
    title: "Suburban Townhouse",
    price: 425000,
    location: "Austin, Texas",
    bedrooms: 3,
    bathrooms: 2.5,
    area: 1750,
    type: "townhouse",
    status: "for-sale",
    image: "/placeholder.svg?height=300&width=400",
  },
]

export function PropertyList({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { isSignedIn, user } = useUser()
  const { toast } = useToast()
  const [savedProperties, setSavedProperties] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [filteredProperties, setFilteredProperties] = useState(mockProperties)
  const [currentPage, setCurrentPage] = useState(1)
  const propertiesPerPage = 8

  useEffect(() => {
    // Simulate loading properties
    const timer = setTimeout(() => {
      setLoading(false)
      // In a real app, you would fetch saved properties from the database
      setSavedProperties(["2"])

      // Filter properties based on search params
      let filtered = [...mockProperties]

      if (searchParams.location) {
        const location = String(searchParams.location).toLowerCase()
        filtered = filtered.filter((p) => p.location.toLowerCase().includes(location))
      }

      if (searchParams.type) {
        filtered = filtered.filter((p) => p.type === searchParams.type)
      }

      if (searchParams.minPrice) {
        const minPrice = Number(searchParams.minPrice)
        filtered = filtered.filter((p) => p.price >= minPrice)
      }

      if (searchParams.maxPrice) {
        const maxPrice = Number(searchParams.maxPrice)
        filtered = filtered.filter((p) => p.price <= maxPrice)
      }

      if (searchParams.bedrooms) {
        const bedrooms = Number(searchParams.bedrooms)
        filtered = filtered.filter((p) => p.bedrooms >= bedrooms)
      }

      if (searchParams.status) {
        filtered = filtered.filter((p) => p.status === searchParams.status)
      }

      setFilteredProperties(filtered)
    }, 1000)

    return () => clearTimeout(timer)
  }, [searchParams])

  const handleSaveProperty = async (propertyId: string) => {
    if (!isSignedIn) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save properties",
        variant: "destructive",
      })
      return
    }

    try {
      // In a real app, this would call a server action to toggle saved status
      // await toggleSaveProperty(propertyId)

      // For demo purposes, we'll just update the local state
      setSavedProperties((prev) =>
        prev.includes(propertyId) ? prev.filter((id) => id !== propertyId) : [...prev, propertyId],
      )

      toast({
        title: savedProperties.includes(propertyId)
          ? "Property removed from saved list"
          : "Property saved successfully",
        description: "You can view your saved properties in your dashboard",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save property. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Pagination logic
  const indexOfLastProperty = currentPage * propertiesPerPage
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty)
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage)

  if (loading) {
    return <PropertyListSkeleton />
  }

  if (filteredProperties.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-2">No properties found</h3>
        <p className="text-muted-foreground mb-6">Try adjusting your search filters</p>
        <Button asChild>
          <Link href="/properties">Clear Filters</Link>
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-4">
        <p className="text-muted-foreground">
          Showing {currentProperties.length} of {filteredProperties.length} properties
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentProperties.map((property) => (
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
                  onClick={() => handleSaveProperty(property.id)}
                >
                  <Heart
                    className={`h-5 w-5 ${savedProperties.includes(property.id) ? "fill-red-500 text-red-500" : ""}`}
                  />
                  <span className="sr-only">Save property</span>
                </Button>
              </div>
              <Badge
                className="absolute top-2 left-2"
                variant={property.status === "for-rent" ? "secondary" : "default"}
              >
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

      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage > 1) setCurrentPage(currentPage - 1)
                }}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    setCurrentPage(index + 1)
                  }}
                  isActive={currentPage === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                }}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}

function PropertyListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <Skeleton className="h-[200px] w-full" />
          <CardContent className="p-4">
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2 mb-3" />
            <div className="flex justify-between text-sm">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Skeleton className="h-10 w-full" />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
