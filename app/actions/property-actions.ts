"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs/server"
import prisma from "@/lib/prisma"
import { z } from "zod"

// Schema for property validation
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

export type PropertyFormData = z.infer<typeof propertySchema>

// Create a new property
export async function createProperty(formData: FormData) {
  const { userId } = auth()

  if (!userId) {
    throw new Error("You must be logged in to create a property")
  }

  // Get the user from the database
  const dbUser = await prisma.user.findUnique({
    where: { clerkId: userId },
  })

  if (!dbUser) {
    throw new Error("User not found")
  }

  // Check if user is an agent or admin
  if (dbUser.role !== "AGENT" && dbUser.role !== "ADMIN") {
    throw new Error("You must be an agent or admin to create a property")
  }

  // Parse and validate form data
  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
    price: formData.get("price"),
    address: formData.get("address"),
    city: formData.get("city"),
    state: formData.get("state"),
    country: formData.get("country"),
    zipCode: formData.get("zipCode"),
    type: formData.get("type"),
    status: formData.get("status"),
    bedrooms: formData.get("bedrooms"),
    bathrooms: formData.get("bathrooms"),
    area: formData.get("area"),
    features: formData.getAll("features"),
    images: formData.getAll("images"),
  }

  try {
    const validatedData = propertySchema.parse(rawData)

    // Create the property
    const property = await prisma.property.create({
      data: {
        ...validatedData,
        createdById: dbUser.id,
      },
    })

    revalidatePath("/properties")
    revalidatePath("/dashboard/properties")

    return { success: true, propertyId: property.id }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.errors }
    }

    return { success: false, error: "Failed to create property" }
  }
}

// Update an existing property
export async function updateProperty(propertyId: string, formData: FormData) {
  const { userId } = auth()

  if (!userId) {
    throw new Error("You must be logged in to update a property")
  }

  // Get the property
  const property = await prisma.property.findUnique({
    where: { id: propertyId },
    include: { createdBy: true },
  })

  if (!property) {
    throw new Error("Property not found")
  }

  // Get the user from the database
  const dbUser = await prisma.user.findUnique({
    where: { clerkId: userId },
  })

  if (!dbUser) {
    throw new Error("User not found")
  }

  // Check if user is the owner or an admin
  if (property.createdById !== dbUser.id && dbUser.role !== "ADMIN") {
    throw new Error("You don't have permission to update this property")
  }

  // Parse and validate form data
  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
    price: formData.get("price"),
    address: formData.get("address"),
    city: formData.get("city"),
    state: formData.get("state"),
    country: formData.get("country"),
    zipCode: formData.get("zipCode"),
    type: formData.get("type"),
    status: formData.get("status"),
    bedrooms: formData.get("bedrooms"),
    bathrooms: formData.get("bathrooms"),
    area: formData.get("area"),
    features: formData.getAll("features"),
    images: formData.getAll("images"),
  }

  try {
    const validatedData = propertySchema.parse(rawData)

    // Update the property
    await prisma.property.update({
      where: { id: propertyId },
      data: validatedData,
    })

    revalidatePath(`/properties/${propertyId}`)
    revalidatePath("/properties")
    revalidatePath("/dashboard/properties")

    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.errors }
    }

    return { success: false, error: "Failed to update property" }
  }
}

// Delete a property
export async function deleteProperty(propertyId: string) {
  const { userId } = auth()

  if (!userId) {
    throw new Error("You must be logged in to delete a property")
  }

  // Get the property
  const property = await prisma.property.findUnique({
    where: { id: propertyId },
    include: { createdBy: true },
  })

  if (!property) {
    throw new Error("Property not found")
  }

  // Get the user from the database
  const dbUser = await prisma.user.findUnique({
    where: { clerkId: userId },
  })

  if (!dbUser) {
    throw new Error("User not found")
  }

  // Check if user is the owner or an admin
  if (property.createdById !== dbUser.id && dbUser.role !== "ADMIN") {
    throw new Error("You don't have permission to delete this property")
  }

  // Delete the property
  await prisma.property.delete({
    where: { id: propertyId },
  })

  revalidatePath("/properties")
  revalidatePath("/dashboard/properties")

  return { success: true }
}

// Toggle save property
export async function toggleSaveProperty(propertyId: string) {
  const { userId } = auth()

  if (!userId) {
    throw new Error("You must be logged in to save a property")
  }

  // Get the user from the database
  const dbUser = await prisma.user.findUnique({
    where: { clerkId: userId },
    include: { savedProperties: true },
  })

  if (!dbUser) {
    throw new Error("User not found")
  }

  // Check if property exists
  const property = await prisma.property.findUnique({
    where: { id: propertyId },
  })

  if (!property) {
    throw new Error("Property not found")
  }

  // Check if property is already saved
  const isSaved = dbUser.savedPropertyIds.includes(propertyId)

  if (isSaved) {
    // Remove property from saved list
    await prisma.user.update({
      where: { id: dbUser.id },
      data: {
        savedProperties: {
          disconnect: { id: propertyId },
        },
      },
    })
  } else {
    // Add property to saved list
    await prisma.user.update({
      where: { id: dbUser.id },
      data: {
        savedProperties: {
          connect: { id: propertyId },
        },
      },
    })
  }

  revalidatePath("/dashboard/saved")

  return { success: true, isSaved: !isSaved }
}

// Create a booking request
export async function createBookingRequest(propertyId: string, message: string) {
  const { userId } = auth()

  if (!userId) {
    throw new Error("You must be logged in to create a booking request")
  }

  // Get the user from the database
  const dbUser = await prisma.user.findUnique({
    where: { clerkId: userId },
  })

  if (!dbUser) {
    throw new Error("User not found")
  }

  // Check if property exists
  const property = await prisma.property.findUnique({
    where: { id: propertyId },
  })

  if (!property) {
    throw new Error("Property not found")
  }

  // Create the booking request
  await prisma.bookingRequest.create({
    data: {
      message,
      property: { connect: { id: propertyId } },
      user: { connect: { id: dbUser.id } },
    },
  })

  return { success: true }
}

// Increment property views
export async function incrementPropertyViews(propertyId: string) {
  // Check if property exists
  const property = await prisma.property.findUnique({
    where: { id: propertyId },
  })

  if (!property) {
    throw new Error("Property not found")
  }

  // Increment views
  await prisma.property.update({
    where: { id: propertyId },
    data: { views: { increment: 1 } },
  })

  return { success: true }
}
