import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">About RealEstate Pro</h1>
          <p className="text-muted-foreground text-lg">
            We're on a mission to make real estate simple, efficient, and accessible for everyone.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              Founded in 2010, RealEstate Pro started with a simple idea: make real estate transactions transparent and
              stress-free. What began as a small team of three passionate real estate professionals has grown into a
              nationwide network of agents and property experts.
            </p>
            <p className="text-muted-foreground mb-4">
              Over the years, we've helped thousands of families find their dream homes and investors secure valuable
              properties. Our commitment to excellence and customer satisfaction has made us one of the most trusted
              names in real estate.
            </p>
            <Button asChild className="mt-2">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
          <div className="rounded-lg overflow-hidden">
            <img
              src="/placeholder.svg?height=400&width=600&text=Our+Team"
              alt="Our team"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 my-12">
          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
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
                  className="h-6 w-6 text-primary"
                >
                  <path d="M2 22V8a5 5 0 0 1 5-5h10a5 5 0 0 1 5 5v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z" />
                  <path d="M19 3v4" />
                  <path d="M5 3v4" />
                  <path d="M2 9h20" />
                  <path d="M12 15a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
                  <path d="m13.5 17.5-.86-.86" />
                  <path d="m10.5 14.5-.86-.86" />
                  <path d="m13.5 14.5.86-.86" />
                  <path d="m10.5 17.5.86-.86" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">15+ Years</h3>
              <p className="text-muted-foreground">Of experience in the real estate market</p>
            </CardContent>
          </Card>
          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
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
                  className="h-6 w-6 text-primary"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">10,000+</h3>
              <p className="text-muted-foreground">Happy clients across the country</p>
            </CardContent>
          </Card>
          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
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
                  className="h-6 w-6 text-primary"
                >
                  <path d="m3 11 18-5v12L3 14v-3Z" />
                  <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold">50+ Cities</h3>
              <p className="text-muted-foreground">With active property listings</p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-muted rounded-lg p-8 my-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground text-lg mb-6">
              "To transform the real estate experience through innovation, integrity, and exceptional service, making
              property transactions seamless and accessible for everyone."
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild>
                <Link href="/properties">Browse Properties</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">Join Our Team</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="my-8">
          <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "John Smith",
                role: "CEO & Founder",
                image: "/placeholder.svg?height=300&width=300&text=John",
                bio: "With over 20 years in real estate, John founded RealEstate Pro with a vision to transform the industry.",
              },
              {
                name: "Sarah Johnson",
                role: "Chief Operating Officer",
                image: "/placeholder.svg?height=300&width=300&text=Sarah",
                bio: "Sarah brings 15 years of operational excellence and a passion for streamlining processes.",
              },
              {
                name: "Michael Chen",
                role: "Head of Technology",
                image: "/placeholder.svg?height=300&width=300&text=Michael",
                bio: "Michael leads our tech initiatives, bringing cutting-edge solutions to the real estate market.",
              },
            ].map((person, index) => (
              <Card key={index} className="overflow-hidden">
                <img src={person.image || "/placeholder.svg"} alt={person.name} className="w-full h-64 object-cover" />
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold">{person.name}</h3>
                  <p className="text-primary font-medium mb-2">{person.role}</p>
                  <p className="text-muted-foreground">{person.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
