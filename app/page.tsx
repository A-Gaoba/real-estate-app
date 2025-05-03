import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, HomeIcon, Search, User, Building, MapPin, Star } from "lucide-react"
import { PropertyCard } from "@/components/PropertyCard"
import { SearchBar } from "@/components/SearchBar"
import { getFeaturedProperties } from "@/lib/properties"

export default async function Home() {
  // Fetch featured properties
  const featuredProperties = await getFeaturedProperties(6)

  return (
    <div className="space-y-24">
      {/* Enhanced Hero Section with Gradient Background */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
        <div className="container relative px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-6 mb-16">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
              Find Your Dream Home Today
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl text-lg">
              Discover the perfect property with our comprehensive real estate platform. Browse listings, connect with
              agents, and find your ideal home.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Featured Properties Section with Enhanced Header */}
      <section className="py-16">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12">
            <div className="flex items-center gap-3">
              <Star className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold tracking-tighter">Featured Properties</h2>
            </div>
            <Link href="/properties">
              <Button variant="outline" className="gap-2 group">
                View All Properties
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProperties.length > 0
              ? featuredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    property={{
                      id: property.id,
                      title: property.title,
                      price: property.price,
                      address: property.address,
                      city: property.city,
                      state: property.state,
                      images: property.images,
                      features: property.features,
                    }}
                    featured={true}
                  />
                ))
              : Array.from({ length: 3 }).map((_, i) => (
                  <PropertyCard
                    key={i}
                    property={{
                      id: `dummy-${i}`,
                      title: "Beautiful Property",
                      price: 350000,
                      address: "123 Main St",
                      city: "Anytown",
                      state: "CA",
                      images: ["/placeholder.svg?height=300&width=400"],
                      features: ["3 Bedrooms", "2 Bathrooms", "1500 sqft"],
                    }}
                    featured={true}
                  />
                ))}
          </div>
        </div>
      </section>

      {/* Enhanced Property Types Section */}
      <section className="py-20 bg-gradient-to-b from-muted/50 to-background">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">Browse by Property Type</h2>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <Link href="/search?type=HOUSE">
              <div className="group bg-card hover:bg-accent transition-all duration-300 rounded-xl p-8 text-center shadow-sm border hover:shadow-md">
                <HomeIcon className="h-12 w-12 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold">Houses</h3>
                <p className="text-muted-foreground mt-2">Find your perfect family home</p>
              </div>
            </Link>
            <Link href="/search?type=APARTMENT">
              <div className="group bg-card hover:bg-accent transition-all duration-300 rounded-xl p-8 text-center shadow-sm border hover:shadow-md">
                <Building className="h-12 w-12 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold">Apartments</h3>
                <p className="text-muted-foreground mt-2">Modern urban living spaces</p>
              </div>
            </Link>
            <Link href="/search?type=CONDO">
              <div className="group bg-card hover:bg-accent transition-all duration-300 rounded-xl p-8 text-center shadow-sm border hover:shadow-md">
                <Building className="h-12 w-12 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold">Condos</h3>
                <p className="text-muted-foreground mt-2">Luxury with amenities</p>
              </div>
            </Link>
            <Link href="/search?type=TOWNHOUSE">
              <div className="group bg-card hover:bg-accent transition-all duration-300 rounded-xl p-8 text-center shadow-sm border hover:shadow-md">
                <HomeIcon className="h-12 w-12 mx-auto mb-4 text-primary group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold">Townhouses</h3>
                <p className="text-muted-foreground mt-2">Urban-suburban blend</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Cities Section */}
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter text-center mb-12">Popular Cities</h2>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            <Link href="/search?location=New York">
              <div className="group relative h-72 overflow-hidden rounded-xl">
                <img
                  src="/placeholder.svg?height=300&width=400"
                  alt="New York"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6 flex items-center">
                  <MapPin className="h-5 w-5 text-white mr-2" />
                  <h3 className="text-xl font-bold text-white">New York</h3>
                </div>
              </div>
            </Link>
            <Link href="/search?location=Los Angeles">
              <div className="group relative h-72 overflow-hidden rounded-xl">
                <img
                  src="/placeholder.svg?height=300&width=400"
                  alt="Los Angeles"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6 flex items-center">
                  <MapPin className="h-5 w-5 text-white mr-2" />
                  <h3 className="text-xl font-bold text-white">Los Angeles</h3>
                </div>
              </div>
            </Link>
            <Link href="/search?location=Miami">
              <div className="group relative h-72 overflow-hidden rounded-xl">
                <img
                  src="/placeholder.svg?height=300&width=400"
                  alt="Miami"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6 flex items-center">
                  <MapPin className="h-5 w-5 text-white mr-2" />
                  <h3 className="text-xl font-bold text-white">Miami</h3>
                </div>
              </div>
            </Link>
            <Link href="/search?location=Chicago">
              <div className="group relative h-72 overflow-hidden rounded-xl">
                <img
                  src="/placeholder.svg?height=300&width=400"
                  alt="Chicago"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-6 left-6 flex items-center">
                  <MapPin className="h-5 w-5 text-white mr-2" />
                  <h3 className="text-xl font-bold text-white">Chicago</h3>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Why Choose Our Platform</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                We offer a comprehensive suite of tools and services to make your property journey seamless.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
            <div className="group flex flex-col items-center space-y-4 rounded-xl border p-8 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="rounded-full bg-primary/10 p-4">
                <HomeIcon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Extensive Listings</h3>
              <p className="text-muted-foreground text-center">Access thousands of verified property listings across the country</p>
            </div>
            <div className="group flex flex-col items-center space-y-4 rounded-xl border p-8 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="rounded-full bg-primary/10 p-4">
                <User className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Expert Agents</h3>
              <p className="text-muted-foreground text-center">Connect with experienced real estate professionals</p>
            </div>
            <div className="group flex flex-col items-center space-y-4 rounded-xl border p-8 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="rounded-full bg-primary/10 p-4">
                <Search className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Smart Search</h3>
              <p className="text-muted-foreground text-center">Find your perfect property with advanced search filters</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Ready to Find Your Dream Home?</h2>
              <p className="max-w-[600px] text-primary-foreground/90">
                Start your property search today and let us help you find the perfect place to call home.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/properties">
                <Button variant="secondary" size="lg">
                  Browse Properties
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10"
                >
                  Contact Agent
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
