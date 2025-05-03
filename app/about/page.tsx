import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, Users, Award, Clock } from "lucide-react"

export default function About() {
  return (
    <div className="space-y-12">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold">About Us</h1>
        <p className="text-muted-foreground text-lg max-w-3xl">
          We are a leading real estate platform dedicated to helping people find their perfect home. With years of
          experience in the industry, we provide a seamless and efficient way to browse, search, and purchase
          properties.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Properties Listed</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10,000+</div>
            <p className="text-xs text-muted-foreground">Properties available across the country</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Happy Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,000+</div>
            <p className="text-xs text-muted-foreground">Satisfied customers who found their dream home</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expert Agents</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">200+</div>
            <p className="text-xs text-muted-foreground">Professional agents ready to assist you</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Years of Experience</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15+</div>
            <p className="text-xs text-muted-foreground">Years of experience in the real estate industry</p>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Our Mission</h2>
        <p className="text-muted-foreground max-w-3xl">
          Our mission is to simplify the process of finding and purchasing real estate. We believe that everyone
          deserves to find a place they can call home, and we're committed to making that process as smooth and
          enjoyable as possible.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold">Our Team</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4">
                <img
                  src="/placeholder.svg?height=100&width=100"
                  alt="John Smith"
                  className="h-24 w-24 rounded-full object-cover"
                />
                <div className="space-y-1 text-center">
                  <h3 className="font-bold">John Smith</h3>
                  <p className="text-sm text-muted-foreground">CEO & Founder</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4">
                <img
                  src="/placeholder.svg?height=100&width=100"
                  alt="Sarah Johnson"
                  className="h-24 w-24 rounded-full object-cover"
                />
                <div className="space-y-1 text-center">
                  <h3 className="font-bold">Sarah Johnson</h3>
                  <p className="text-sm text-muted-foreground">Head of Sales</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-4">
                <img
                  src="/placeholder.svg?height=100&width=100"
                  alt="Michael Brown"
                  className="h-24 w-24 rounded-full object-cover"
                />
                <div className="space-y-1 text-center">
                  <h3 className="font-bold">Michael Brown</h3>
                  <p className="text-sm text-muted-foreground">Lead Developer</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
