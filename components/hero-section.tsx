import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-background/60 z-10" />
      <div
        className="relative h-[500px] bg-cover bg-center"
        style={{ backgroundImage: "url('/placeholder.svg?height=500&width=1200')" }}
      >
        <div className="container mx-auto px-4 h-full flex items-center relative z-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Find Your Dream Home</h1>
            <p className="text-lg md:text-xl mb-8">
              Discover the perfect property with our extensive listings and expert agents
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/properties">Browse Properties</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Contact an Agent</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
