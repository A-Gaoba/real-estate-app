import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import FeaturedProperties from "@/components/featured-properties"
import HeroSection from "@/components/hero-section"
import SearchFilters from "@/components/search-filters"

export default function Home() {
  return (
    <div className="flex flex-col gap-12">
      <HeroSection />

      <section className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-6">Find Your Dream Property</h2>
          <SearchFilters />
        </div>

        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold">Featured Properties</h2>
            <Button variant="outline" asChild>
              <a href="/properties">View All</a>
            </Button>
          </div>
          <FeaturedProperties />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="p-6 flex flex-col items-center text-center">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary h-8 w-8"
              >
                <path d="m21 8-2 2-1.5-3.7a1 1 0 0 0-1.3-.5L9 9 5 8l3 4-1.5 4.7a1 1 0 0 0 .7 1.3L12 19l2 3 1-4.7a1 1 0 0 1 .7-.6L21 16l-2-3 2-5Z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Premium Listings</h3>
            <p className="text-muted-foreground">Exclusive properties handpicked by our expert agents</p>
          </Card>

          <Card className="p-6 flex flex-col items-center text-center">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary h-8 w-8"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Trusted Agents</h3>
            <p className="text-muted-foreground">Work with the best real estate professionals in the industry</p>
          </Card>

          <Card className="p-6 flex flex-col items-center text-center">
            <div className="bg-primary/10 p-4 rounded-full mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary h-8 w-8"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Secure Transactions</h3>
            <p className="text-muted-foreground">Safe and transparent property dealings from start to finish</p>
          </Card>
        </div>
      </section>
    </div>
  )
}
