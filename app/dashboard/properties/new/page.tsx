import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import PropertyForm from "@/components/property-form"

export default function NewPropertyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Add New Property</CardTitle>
          <CardDescription>Fill out the form below to list a new property</CardDescription>
        </CardHeader>
        <CardContent>
          <PropertyForm mode="create" />
        </CardContent>
      </Card>
    </div>
  )
}
