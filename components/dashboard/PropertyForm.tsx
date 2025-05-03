"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import { createProperty, updateProperty } from "@/lib/actions"
import { PropertyType, PropertyStatus, type Property } from "@prisma/client"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

// Define the form schema
const formSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  price: z.coerce.number().positive("Price must be positive"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
  zip: z.string().min(2, "ZIP code must be at least 2 characters"),
  type: z.nativeEnum(PropertyType),
  status: z.nativeEnum(PropertyStatus),
  bedrooms: z.coerce.number().int().positive("Bedrooms must be positive").optional(),
  bathrooms: z.coerce.number().positive("Bathrooms must be positive").optional(),
  sqft: z.coerce.number().int().positive("Square footage must be positive").optional(),
  features: z.array(z.string()).optional(),
  isFeatured: z.boolean().default(false),
  images: z.array(z.string()).min(1, "At least one image is required"),
})

type FormValues = z.infer<typeof formSchema>

interface PropertyFormProps {
  property?: Property
}

export function PropertyForm({ property }: PropertyFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [featureInput, setFeatureInput] = useState("")

  // Initialize form with existing property data or defaults
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: property
      ? {
          ...property,
          features: property.features || [],
          images: property.images || [],
        }
      : {
          title: "",
          description: "",
          price: 0,
          address: "",
          city: "",
          state: "",
          country: "",
          zip: "",
          type: PropertyType.HOUSE,
          status: PropertyStatus.AVAILABLE,
          bedrooms: undefined,
          bathrooms: undefined,
          sqft: undefined,
          features: [],
          isFeatured: false,
          images: ["/placeholder.svg?height=500&width=800"],
        },
  })

  const features = form.watch("features") || []
  const images = form.watch("images") || []

  const addFeature = () => {
    if (featureInput.trim() && !features.includes(featureInput.trim())) {
      form.setValue("features", [...features, featureInput.trim()])
      setFeatureInput("")
    }
  }

  const removeFeature = (feature: string) => {
    form.setValue(
      "features",
      features.filter((f) => f !== feature),
    )
  }

  const addImage = () => {
    form.setValue("images", [...images, "/placeholder.svg?height=500&width=800"])
  }

  const removeImage = (index: number) => {
    form.setValue(
      "images",
      images.filter((_, i) => i !== index),
    )
  }

  const updateImage = (index: number, value: string) => {
    const newImages = [...images]
    newImages[index] = value
    form.setValue("images", newImages)
  }

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true)

      if (property) {
        // Update existing property
        await updateProperty(property.id, data)
        toast({
          title: "Property updated",
          description: "Your property has been updated successfully.",
        })
      } else {
        // Create new property
        await createProperty(data)
        toast({
          title: "Property created",
          description: "Your property has been created successfully.",
        })
      }

      router.push("/dashboard/agent")
      router.refresh()
    } catch (error) {
      console.error("Error submitting property:", error)
      toast({
        title: "Error",
        description: "There was an error submitting your property. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Basic Information</h2>
                <Separator />

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter property title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter property description" className="min-h-32" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" step="1000" placeholder="Enter price" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select property type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Object.values(PropertyType).map((type) => (
                              <SelectItem key={type} value={type}>
                                {type.charAt(0) + type.slice(1).toLowerCase()}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="bedrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bedrooms</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" placeholder="Number of bedrooms" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bathrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bathrooms</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" step="0.5" placeholder="Number of bathrooms" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sqft"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Square Footage</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" placeholder="Square footage" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select property status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.values(PropertyStatus).map((status) => (
                            <SelectItem key={status} value={status}>
                              {status.charAt(0) + status.slice(1).toLowerCase()}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="isFeatured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Featured Property</FormLabel>
                        <FormDescription>
                          Featured properties appear on the homepage and get more visibility.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Location</h2>
                <Separator />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter street address" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter city" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter state" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter country" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="zip"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ZIP Code</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter ZIP code" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Features</h2>
                <Separator />

                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add a feature (e.g., 'Swimming Pool')"
                      value={featureInput}
                      onChange={(e) => setFeatureInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          addFeature()
                        }
                      }}
                    />
                    <Button type="button" onClick={addFeature}>
                      Add
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-sm">
                        <span>{feature}</span>
                        <button
                          type="button"
                          onClick={() => removeFeature(feature)}
                          className="ml-1 rounded-full text-muted-foreground hover:text-foreground"
                        >
                          &times;
                        </button>
                      </div>
                    ))}
                    {features.length === 0 && <p className="text-sm text-muted-foreground">No features added yet.</p>}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Images</h2>
                <Separator />

                <div className="space-y-4">
                  <Button type="button" onClick={addImage}>
                    Add Image
                  </Button>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="space-y-2">
                        <div className="relative aspect-video overflow-hidden rounded-md border">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Property ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute right-2 top-2 rounded-full bg-background/80 p-1 text-muted-foreground hover:text-foreground"
                          >
                            &times;
                          </button>
                        </div>
                        <Input
                          placeholder="Image URL"
                          value={image}
                          onChange={(e) => updateImage(index, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.push("/dashboard/agent")}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : property ? "Update Property" : "Create Property"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
