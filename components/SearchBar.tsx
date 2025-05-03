"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PropertyType } from "@prisma/client"
import { Search } from "lucide-react"

export function SearchBar() {
  const router = useRouter()
  const [location, setLocation] = useState("")
  const [propertyType, setPropertyType] = useState<string>("ALL")
  const [priceRange, setPriceRange] = useState<string>("ANY")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams()
    if (location) params.append("location", location)
    if (propertyType !== "ALL") params.append("type", propertyType)
    if (priceRange !== "ANY") params.append("price", priceRange)

    router.push(`/search?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row gap-4 p-4 bg-card rounded-lg shadow-lg border">
        <div className="flex-1">
          <Input
            placeholder="City, neighborhood, or address"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="h-12"
          />
        </div>
        <div className="w-full md:w-48">
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Property Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Types</SelectItem>
              <SelectItem value={PropertyType.HOUSE}>House</SelectItem>
              <SelectItem value={PropertyType.APARTMENT}>Apartment</SelectItem>
              <SelectItem value={PropertyType.CONDO}>Condo</SelectItem>
              <SelectItem value={PropertyType.TOWNHOUSE}>Townhouse</SelectItem>
              <SelectItem value={PropertyType.LAND}>Land</SelectItem>
              <SelectItem value={PropertyType.COMMERCIAL}>Commercial</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full md:w-48">
          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ANY">Any Price</SelectItem>
              <SelectItem value="0-100000">Under $100k</SelectItem>
              <SelectItem value="100000-250000">$100k - $250k</SelectItem>
              <SelectItem value="250000-500000">$250k - $500k</SelectItem>
              <SelectItem value="500000-750000">$500k - $750k</SelectItem>
              <SelectItem value="750000-1000000">$750k - $1M</SelectItem>
              <SelectItem value="1000000-9999999">$1M+</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="h-12 px-6">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>
    </form>
  )
}
