"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { createProperty, updateProperty } from "@/app/actions/property-actions"

// Property form schema
const propertySchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  price: z.coerce.number().positive("Price must be a positive number"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  country: z.string().min(2, "Country is required"),
  zipCode: z.string().min(2, "Zip code is required"),
  type: z.enum(["APARTMENT", "HOUSE", "CONDO", "TOWNHOUSE", "LAND", "COMMERCIAL"]),
  status: z.enum(["FOR_SALE", "FOR_RENT", "SOLD", "RENTED"]),
  bedrooms: z.coerce.number().int().min(0, "Bedrooms must be a positive number"),
  bathrooms: z.coerce.number().min(0, "Bathrooms must be a positive number"),
  area: z.coerce.number().positive("Area must be a positive number"),
  features: z.array(z.string()).optional(),
  images: z.array(z.string()).min(1, "At least one image is required"),
})

type PropertyFormValues = z.infer<typeof propertySchema>

// Available property features
const availableFeatures = [
  { id: "pool", label: "Swimming Pool" },
  { id: "garden", label: "Garden" },
  { id: "garage", label: "Garage" },
  { id: "parking", label: "Parking" },
  { id: "airConditioning", label: "Air Conditioning" },
  { id: "heating", label: "Heating" },
  { id: "balcony", label: "Balcony" },
  { id: "gym", label: "Gym" },
  { id: "security", label: "Security System" },
  { id: "elevator", label: "Elevator" },
  { id: "fireplace", label: "Fireplace" },
  { id: "laundry", label: "Laundry Room" },
  { id: "furnished", label: "Furnished" },
  { id: "petFriendly", label: "Pet Friendly" },
  { id: "storage", label: "Storage" },
]

interface PropertyFormProps {
  property?: any // In a real app, this would be properly typed
  mode: "create" | "edit"
}

export default function PropertyForm({ property, mode }: PropertyFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState<string[]>(property?.images || [])

  // Initialize form with default values or existing property data
  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: property
      ? {
          ...property,
          features: property.features || [],
        }
      : {
          title: "",
          description: "",
          price: 0,
          address: "",
          city: "",
          state: "",
          country: "",
          zipCode: "",
          type: "APARTMENT",
          status: "FOR_SALE",
          bedrooms: 0,
          bathrooms: 0,
          area: 0,
          features: [],
          images: [],
        },
  })

  const onSubmit = async (data: PropertyFormValues) => {
    setLoading(true)

    try {
      // Convert form data to FormData for server action
      const formData = new FormData()
      Object.entries(data).forEach(([key, value]) => {
        if (key === "features" || key === "images") {
          // Handle arrays
          if (Array.isArray(value)) {
            value.forEach((item) => {
              formData.append(key, item)
            })
          }
        } else {
          formData.append(key, String(value))
        }
      })

      // Add images
      images.forEach((image) => {
        formData.append("images", image)
      })

      let result

      if (mode === "create") {
        result = await createProperty(formData)
      } else {
        result = await updateProperty(property.id, formData)
      }

      if (result.success) {
        toast({
          title: mode === "create" ? "Property created" : "Property updated",
          description:
            mode === "create"
              ? "Your property has been created successfully"
              : "Your property has been updated successfully",
        })

        if (mode === "create" && result.propertyId) {
          router.push(`/properties/${result.propertyId}`)
        } else {
          router.push("/dashboard/properties")
        }
      } else {
        toast({
          title: "Error",
          description: result.error || "Something went wrong. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    // In a real app, you would upload these files to a storage service
    // For this demo, we'll just use placeholder images
    const newImages = Array.from(files).map(
      (_, index) => `/placeholder.svg?height=600&width=800&text=Image ${images.length + index + 1}`,
    )

    setImages((prev) => [...prev, ...newImages])
    form.setValue("images", [...images, ...newImages])
  }

  // Remove an image
  const removeImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
    form.setValue("images", newImages)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter property title" {...field} />
                  </FormControl>
                  <FormDescription>A clear and descriptive title for your property</FormDescription>
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
                    <Textarea placeholder="Describe your property in detail" className="min-h-[150px]" {...field} />
                  </FormControl>
                  <FormDescription>Provide a detailed description of your property</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="FOR_SALE">For Sale</SelectItem>
                        <SelectItem value="FOR_RENT">For Rent</SelectItem>
                        <SelectItem value="SOLD">Sold</SelectItem>
                        <SelectItem value="RENTED">Rented</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
                      <SelectItem value="APARTMENT">Apartment</SelectItem>
                      <SelectItem value="HOUSE">House</SelectItem>
                      <SelectItem value="CONDO">Condo</SelectItem>
                      <SelectItem value="TOWNHOUSE">Townhouse</SelectItem>
                      <SelectItem value="LAND">Land</SelectItem>
                      <SelectItem value="COMMERCIAL">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="bedrooms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bedrooms</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
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
                      <Input type="number" min="0" step="0.5" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="area"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Area (sq ft)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Street address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="City" {...field} />
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
                    <FormLabel>State/Province</FormLabel>
                    <FormControl>
                      <Input placeholder="State or province" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="Country" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zip/Postal Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Zip or postal code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="features"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>Features</FormLabel>
                    <FormDescription>Select all the features that apply to this property</FormDescription>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {availableFeatures.map((feature) => (
                      <FormField
                        key={feature.id}
                        control={form.control}
                        name="features"
                        render={({ field }) => {
                          return (
                            <FormItem key={feature.id} className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(feature.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, feature.id])
                                      : field.onChange(field.value?.filter((value) => value !== feature.id))
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">{feature.label}</FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="images"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <Input type="file" accept="image/*" multiple onChange={handleImageUpload} />
                      {images.length > 0 && (
                        <div className="grid grid-cols-2 gap-4">
                          {images.map((image, index) => (
                            <Card key={index} className="overflow-hidden">
                              <img
                                src={image || "/placeholder.svg"}
                                alt={`Property image ${index + 1}`}
                                className="h-40 w-full object-cover"
                              />
                              <CardContent className="p-2">
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  className="w-full"
                                  onClick={() => removeImage(index)}
                                  type="button"
                                >
                                  Remove
                                </Button>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormDescription>Upload images of your property. At least one image is required.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : mode === "create" ? "Create Property" : "Update Property"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
