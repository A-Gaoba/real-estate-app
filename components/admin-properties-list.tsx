"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
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
import Link from "next/link"

// Mock data for properties
const mockProperties = [
  {
    id: "prop1",
    title: "Modern Apartment with City View",
    price: 350000,
    location: "Downtown, New York",
    type: "APARTMENT",
    status: "FOR_SALE",
    agent: {
      id: "agent1",
      name: "Jane Smith",
    },
    views: 145,
    createdAt: "2023-08-15T10:30:00Z",
  },
  {
    id: "prop2",
    title: "Spacious Family Home",
    price: 550000,
    location: "Suburbia, California",
    type: "HOUSE",
    status: "FOR_SALE",
    agent: {
      id: "agent2",
      name: "Michael Johnson",
    },
    views: 98,
    createdAt: "2023-07-20T14:45:00Z",
  },
  {
    id: "prop3",
    title: "Luxury Penthouse",
    price: 1200000,
    location: "Marina District, San Francisco",
    type: "CONDO",
    status: "FOR_SALE",
    agent: {
      id: "agent1",
      name: "Jane Smith",
    },
    views: 210,
    createdAt: "2023-09-05T09:15:00Z",
  },
  {
    id: "prop4",
    title: "Cozy Studio for Rent",
    price: 1800,
    location: "Brooklyn, New York",
    type: "APARTMENT",
    status: "FOR_RENT",
    agent: {
      id: "agent3",
      name: "Sarah Williams",
    },
    views: 87,
    createdAt: "2023-08-25T16:20:00Z",
  },
  {
    id: "prop5",
    title: "Waterfront Condo",
    price: 750000,
    location: "Miami Beach, Florida",
    type: "CONDO",
    status: "FOR_SALE",
    agent: {
      id: "agent2",
      name: "Michael Johnson",
    },
    views: 132,
    createdAt: "2023-07-10T11:30:00Z",
  },
]

export default function AdminPropertiesList() {
  const { toast } = useToast()
  const [properties, setProperties] = useState(mockProperties)
  const [loading, setLoading] = useState(true)
  const [propertyToDelete, setPropertyToDelete] = useState<string | null>(null)
  const [propertyToFeature, setPropertyToFeature] = useState<string | null>(null)

  useEffect(() => {
    // Simulate loading properties from API
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
      setProperties((prev) => prev.filter((property) => property.id !== propertyId))

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

  const handleFeatureProperty = async (propertyId: string) => {
    try {
      // In a real app, this would call a server action to feature the property
      // await featureProperty(propertyId)

      toast({
        title: "Property featured",
        description: "Property has been set as featured",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to feature property. Please try again.",
        variant: "destructive",
      })
    } finally {
      setPropertyToFeature(null)
    }
  }

  if (loading) {
    return (
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Agent</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Listed</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-4 w-[200px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[80px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[100px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[80px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[120px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[50px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[100px]" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-[80px] ml-auto" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Agent</TableHead>
            <TableHead>Views</TableHead>
            <TableHead>Listed</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {properties.map((property) => (
            <TableRow key={property.id}>
              <TableCell className="font-medium">{property.title}</TableCell>
              <TableCell>
                {property.status === "FOR_RENT" ? `$${property.price}/mo` : `$${property.price.toLocaleString()}`}
              </TableCell>
              <TableCell>{property.type}</TableCell>
              <TableCell>
                <Badge variant={property.status === "FOR_RENT" ? "secondary" : "default"}>
                  {property.status === "FOR_RENT" ? "For Rent" : "For Sale"}
                </Badge>
              </TableCell>
              <TableCell>{property.agent.name}</TableCell>
              <TableCell>{property.views}</TableCell>
              <TableCell>{new Date(property.createdAt).toLocaleDateString()}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <span className="sr-only">Open menu</span>
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
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                      <Link href={`/properties/${property.id}`}>View Property</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={`/admin/properties/${property.id}/edit`}>Edit Property</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setPropertyToFeature(property.id)}>
                      Set as Featured
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600 focus:text-red-600"
                      onClick={() => setPropertyToDelete(property.id)}
                    >
                      Delete Property
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

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

      <AlertDialog open={!!propertyToFeature} onOpenChange={() => setPropertyToFeature(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Feature Property</AlertDialogTitle>
            <AlertDialogDescription>
              This property will be displayed prominently on the homepage. Continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => propertyToFeature && handleFeatureProperty(propertyToFeature)}>
              Feature Property
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
