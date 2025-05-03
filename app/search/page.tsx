"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

// Mock data for properties (same as in properties page)
const properties = [
  {
    id: "1",
    title: "Modern Apartment in Downtown",
    price: "$250,000",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    location: "Downtown, City",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "2",
    title: "Suburban Family Home",
    price: "$450,000",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2500,
    location: "Suburbia, City",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "3",
    title: "Luxury Penthouse with View",
    price: "$1,200,000",
    bedrooms: 3,
    bathrooms: 3.5,
    sqft: 3000,
    location: "Skyline District, City",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "4",
    title: "Cozy Studio Apartment",
    price: "$150,000",
    bedrooms: 1,
    bathrooms: 1,
    sqft: 600,
    location: "University District, City",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "5",
    title: "Waterfront Condo",
    price: "$550,000",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1500,
    location: "Harbor View, City",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "6",
    title: "Historic Townhouse",
    price: "$650,000",
    bedrooms: 3,
    bathrooms: 2.5,
    sqft: 2200,
    location: "Old Town, City",
    image: "/placeholder.svg?height=300&width=400",
  },
]

export default function Search() {
  const [priceRange, setPriceRange] = useState([100000, 1000000])
  const [filteredProperties, setFilteredProperties] = useState(properties)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Search Properties</h1>

      <div className="grid gap-6 md:grid-cols-4">
        <div className="md:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Location</Label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="downtown">Downtown</SelectItem>
                    <SelectItem value="suburbia">Suburbia</SelectItem>
                    <SelectItem value="skyline">Skyline District</SelectItem>
                    <SelectItem value="university">University District</SelectItem>
                    <SelectItem value="harbor">Harbor View</SelectItem>
                    <SelectItem value="oldtown">Old Town</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Property Type</Label>
                <Select defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="apartment">Apartment</SelectItem>
                    <SelectItem value="house">House</SelectItem>
                    <SelectItem value="condo">Condo</SelectItem>
                    <SelectItem value="townhouse">Townhouse</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Price Range</Label>
                  <span className="text-sm text-muted-foreground">
                    {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                  </span>
                </div>
                <Slider
                  defaultValue={[100000, 1000000]}
                  max={2000000}
                  min={0}
                  step={10000}
                  value={priceRange}
                  onValueChange={setPriceRange}
                />
              </div>

              <div className="space-y-2">
                <Label>Bedrooms</Label>
                <Select defaultValue="any">
                  <SelectTrigger>
                    <SelectValue placeholder="Select bedrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                    <SelectItem value="5">5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Bathrooms</Label>
                <Select defaultValue="any">
                  <SelectTrigger>
                    <SelectValue placeholder="Select bathrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Features</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="pool" />
                    <label
                      htmlFor="pool"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Pool
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="garage" />
                    <label
                      htmlFor="garage"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Garage
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="garden" />
                    <label
                      htmlFor="garden"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Garden
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="aircon" />
                    <label
                      htmlFor="aircon"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Air Conditioning
                    </label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Apply Filters</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="md:col-span-3">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProperties.map((property) => (
              <Card key={property.id} className="overflow-hidden">
                <div className="aspect-video w-full overflow-hidden">
                  <img
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    className="h-full w-full object-cover transition-all hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-1">{property.title}</CardTitle>
                  <p className="text-2xl font-bold">{property.price}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <p>{property.bedrooms} beds</p>
                    <p>{property.bathrooms} baths</p>
                    <p>{property.sqft} sqft</p>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{property.location}</p>
                </CardContent>
                <CardFooter>
                  <Link href={`/properties/${property.id}`} className="w-full">
                    <Button className="w-full">View Details</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
