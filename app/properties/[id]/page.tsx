import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PropertyGallery from "@/components/property-gallery"
import PropertyContactForm from "@/components/property-contact-form"
import PropertyMap from "@/components/property-map"
import PropertyFeatures from "@/components/property-features"
import PropertyActions from "@/components/property-actions"

// Mock data for property details
const mockProperty = {
  id: "1",
  title: "Modern Apartment with City View",
  description:
    "This beautiful modern apartment offers stunning city views and is located in the heart of downtown. The open floor plan features high ceilings, large windows, and premium finishes throughout. The kitchen is equipped with stainless steel appliances and quartz countertops. The primary bedroom has a walk-in closet and an en-suite bathroom with a soaking tub and separate shower. Building amenities include a fitness center, rooftop terrace, and 24-hour concierge service.",
  price: 350000,
  location: "Downtown, New York",
  address: "123 Main Street",
  city: "New York",
  state: "NY",
  country: "USA",
  zipCode: "10001",
  bedrooms: 2,
  bathrooms: 2,
  area: 1200,
  type: "apartment",
  status: "for-sale",
  features: [
    "Central Air Conditioning",
    "Hardwood Floors",
    "In-Unit Laundry",
    "Stainless Steel Appliances",
    "Walk-in Closet",
    "Balcony",
    "Fitness Center",
    "Rooftop Terrace",
    "24-hour Concierge",
    "Pet Friendly",
  ],
  images: [
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
    "/placeholder.svg?height=600&width=800",
  ],
  agent: {
    id: "agent1",
    name: "Jane Smith",
    email: "jane.smith@realestate.com",
    phone: "(555) 123-4567",
    image: "/placeholder.svg?height=200&width=200",
  },
  createdAt: "2023-05-15T10:30:00Z",
  updatedAt: "2023-06-01T14:45:00Z",
}

export default function PropertyDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-2 mb-6">
        <div className="flex items-center gap-2">
          <Link href="/properties" className="text-sm text-muted-foreground hover:text-primary">
            Properties
          </Link>
          <span className="text-sm text-muted-foreground">/</span>
          <span className="text-sm">{mockProperty.title}</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">{mockProperty.title}</h1>
            <p className="text-muted-foreground">
              {mockProperty.address}, {mockProperty.city}, {mockProperty.state} {mockProperty.zipCode}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Badge
              variant={mockProperty.status === "for-rent" ? "secondary" : "default"}
              className="text-base px-3 py-1"
            >
              {mockProperty.status === "for-rent"
                ? `For Rent $${mockProperty.price}/mo`
                : `For Sale $${mockProperty.price.toLocaleString()}`}
            </Badge>
            <PropertyActions propertyId={params.id} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <PropertyGallery images={mockProperty.images} />

          <div className="flex flex-wrap gap-6 my-6">
            <div className="flex items-center gap-2">
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
                className="text-primary"
              >
                <path d="M3 22v-2c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v2H3Z" />
                <path d="M15 22v-2c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v2h-6Z" />
                <path d="M3 10v2c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-2H3Z" />
                <path d="M15 10v2c0 1.1.9 2 2 2h2a2 2 0 0 0 2-2v-2h-6Z" />
                <rect x="3" y="2" width="6" height="8" rx="2" />
                <rect x="15" y="2" width="6" height="8" rx="2" />
              </svg>
              <div>
                <p className="text-sm text-muted-foreground">Bedrooms</p>
                <p className="font-semibold">{mockProperty.bedrooms}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
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
                className="text-primary"
              >
                <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
                <line x1="10" x2="8" y1="5" y2="7" />
                <line x1="2" x2="22" y1="12" y2="12" />
                <line x1="7" x2="7" y1="19" y2="21" />
                <line x1="17" x2="17" y1="19" y2="21" />
              </svg>
              <div>
                <p className="text-sm text-muted-foreground">Bathrooms</p>
                <p className="font-semibold">{mockProperty.bathrooms}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
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
                className="text-primary"
              >
                <rect width="20" height="14" x="2" y="7" rx="2" />
                <path d="M16 21V7" />
                <path d="M8 21V7" />
              </svg>
              <div>
                <p className="text-sm text-muted-foreground">Area</p>
                <p className="font-semibold">{mockProperty.area} sqft</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
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
                className="text-primary"
              >
                <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
              </svg>
              <div>
                <p className="text-sm text-muted-foreground">Type</p>
                <p className="font-semibold capitalize">{mockProperty.type}</p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="description" className="mt-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Property Description</h3>
              <p className="text-muted-foreground whitespace-pre-line">{mockProperty.description}</p>
            </TabsContent>
            <TabsContent value="features" className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Property Features</h3>
              <PropertyFeatures features={mockProperty.features} />
            </TabsContent>
            <TabsContent value="location" className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Property Location</h3>
              <PropertyMap
                address={`${mockProperty.address}, ${mockProperty.city}, ${mockProperty.state} ${mockProperty.zipCode}`}
              />
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <div className="bg-muted p-6 rounded-lg mb-6">
            <div className="flex items-center gap-4 mb-4">
              <img
                src={mockProperty.agent.image || "/placeholder.svg"}
                alt={mockProperty.agent.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold">{mockProperty.agent.name}</h3>
                <p className="text-sm text-muted-foreground">Listing Agent</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2">
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
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span className="text-sm">{mockProperty.agent.phone}</span>
              </div>
              <div className="flex items-center gap-2">
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
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span className="text-sm">{mockProperty.agent.email}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button className="flex-1">Call</Button>
              <Button variant="outline" className="flex-1">
                Email
              </Button>
            </div>
          </div>

          <PropertyContactForm propertyId={params.id} agentId={mockProperty.agent.id} />
        </div>
      </div>
    </div>
  )
}
