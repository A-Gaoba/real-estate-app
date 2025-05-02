"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Home, Edit, Trash2, Eye } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

// Mock data for user properties
const mockUserProperties = [
  {
    id: "101",
    title: "Modern Apartment for Sale",
    price: 425000,
    location: "Downtown, Seattle",
    bedrooms: 2,
    bathrooms: 2,
    area: 1100,
    type: "apartment",
    status: "for-sale",
    image: "/placeholder.svg?height=300&width=400",
    views: 45,
    createdAt: "2023-08-15T10:30:00Z",
  },
  {
    id: "102",
    title: "Luxury Condo with Ocean View",
    price: 3200,
    location: "Miami Beach, Florida",
    bedrooms: 3,
    bathrooms: 2.5,
    area: 1800,
    type: "condo",
    status: "for-rent",
    image: "/placeholder.svg?height=300&width=400",
    rentPeriod: "month",
    views: 78,
    createdAt: "2023-09-05T14:45:00Z",
  },
]

export default function UserProperties() {
  const { toast } = useToast()
  const [userProperties, setUserProperties] = useState(mockUserProperties)
  const [loading, setLoading] = useState(true)
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null)

  useEffect(() => {
    // Simulate loading properties
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleDeleteProperty = async (propertyId: string) => {
    try {
      // In a real app, this would call a server action to delete the property
      // await deleteProperty(propertyId)

      // For demo purposes, we'll just update the local state
      setUserProperties((prev) => prev.filter((p) => p.id !== propertyId))

      toast({
        title: "Property deleted",
        description: "Property has been successfully deleted",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete property. Please try again.",
        variant: "destructive",
      })
    } finally {
      setPropertyToDelete(null)
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
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

  if (userProperties.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
          <Home className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No properties listed</h3>
        <p className="text-muted-foreground mb-6">You haven't listed any properties yet</p>
        <Button asChild>
          <Link href="/dashboard/properties/new">Add New Property</Link>
        </Button>
      </div>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {userProperties.map((property) => (
          <Card key={property.id} className="overflow-hidden">
            <div className="relative">
              <img
                src={property.image || "/placeholder.svg"}
                alt={property.title}
                className="h-[200px] w-full object-cover"
              />
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
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg line-clamp-1">{property.title}</h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
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
                      >
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="12" cy="5" r="1" />
                        <circle cx="12" cy="19" r="1" />
                      </svg>
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href={`/properties/${property.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Property
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/properties/${property.id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Property
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600 focus:text-red-600"
                      onClick={() => setPropertyToDelete(property.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Property
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <p className="text-muted-foreground text-sm mb-3">{property.location}</p>

              <div className="flex justify-between text-sm mb-4">
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

              <div className="flex justify-between text-sm text-muted-foreground">
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
                  >
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  <span>{property.views} views</span>
                </div>
                <div>Listed on {new Date(property.createdAt).toLocaleDateString()}</div>
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-0 flex gap-2">
              <Button asChild variant="outline" className="flex-1">
                <Link href={`/properties/${property.id}`}>View</Link>
              </Button>
              <Button asChild className="flex-1">
                <Link href={`/dashboard/properties/${property.id}/edit`}>Edit</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <AlertDialog open={!!propertyToDelete} onOpenChange={() => setPropertyToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the property and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => propertyToDelete && handleDeleteProperty(propertyToDelete)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
