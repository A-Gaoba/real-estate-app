import { Suspense } from "react"
import { PropertyList } from "@/components/property-list"
import { PropertyListSkeleton } from "@/components/property-list-skeleton"
import SearchFilters from "@/components/search-filters"

export default function PropertiesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Browse Properties</h1>

      <div className="mb-8">
        <SearchFilters />
      </div>

      <Suspense fallback={<PropertyListSkeleton />}>
        <PropertyList searchParams={searchParams} />
      </Suspense>
    </div>
  )
}
