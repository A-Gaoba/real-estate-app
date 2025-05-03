"use server"

import { currentUser } from "@clerk/nextjs/server"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { PropertyType, PropertyStatus, type BookingStatus, type Role } from "@prisma/client"
import { z } from "zod"

export async function updateUsername(username: string) {
  try {
    const user = await currentUser()

    if (!user) {
      throw new Error("Not authenticated")
    }

    // Update the username in the database
    await prisma.user.update({
      where: {
        clerkId: user.id,
      },
      data: {
        username,
      },
    })

    revalidatePath("/dashboard")
    revalidatePath("/dashboard/profile")

    return { success: true }
  } catch (error) {
    console.error("Error updating username:", error)
    throw new Error("Failed to update username")
  }
}

export async function saveProperty(propertyId: string) {
  try {
    const user = await currentUser()

    if (!user) {
      throw new Error("Not authenticated")
    }

    const dbUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
      include: {
        savedProperties: true,
      },
    })

    if (!dbUser) {
      throw new Error("User not found")
    }

    // Check if property is already saved
    const isAlreadySaved = dbUser.savedPropertyIds.includes(propertyId)

    if (isAlreadySaved) {
      // Remove from saved properties
      await prisma.user.update({
        where: {
          id: dbUser.id,
        },
        data: {
          savedPropertyIds: {
            set: dbUser.savedPropertyIds.filter((id) => id !== propertyId),
          },
        },
      })

      // Update the property's savedByIds
      await prisma.property.update({
        where: {
          id: propertyId,
        },
        data: {
          savedByIds: {
            set:
              (
                await prisma.property.findUnique({
                  where: { id: propertyId },
                  select: { savedByIds: true },
                })
              )?.savedByIds.filter((id) => id !== dbUser.id) || [],
          },
        },
      })

      return { success: true, saved: false }
    } else {
      // Add to saved properties
      await prisma.user.update({
        where: {
          id: dbUser.id,
        },
        data: {
          savedPropertyIds: {
            push: propertyId,
          },
        },
      })

      // Update the property's savedByIds
      await prisma.property.update({
        where: {
          id: propertyId,
        },
        data: {
          savedByIds: {
            push: dbUser.id,
          },
        },
      })

      return { success: true, saved: true }
    }
  } catch (error) {
    console.error("Error saving property:", error)
    throw new Error("Failed to save property")
  }
}

export async function createInquiry(data: {
  propertyId: string
  name: string
  email: string
  phone?: string
  message: string
}) {
  try {
    const user = await currentUser()

    if (!user) {
      throw new Error("Not authenticated")
    }

    const dbUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
    })

    if (!dbUser) {
      throw new Error("User not found")
    }

    // Create the inquiry
    const inquiry = await prisma.inquiry.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        message: data.message,
        userId: dbUser.id,
        propertyId: data.propertyId,
      },
    })

    revalidatePath("/dashboard/inquiries")

    return { success: true, inquiryId: inquiry.id }
  } catch (error) {
    console.error("Error creating inquiry:", error)
    throw new Error("Failed to create inquiry")
  }
}

// Property form schema
const propertyFormSchema = z.object({
  title: z.string().min(5),
  description: z.string().min(20),
  price: z.number().positive(),
  address: z.string().min(5),
  city: z.string().min(2),
  state: z.string().min(2),
  country: z.string().min(2),
  zip: z.string().min(2),
  type: z.nativeEnum(PropertyType),
  status: z.nativeEnum(PropertyStatus),
  bedrooms: z.number().int().positive().optional(),
  bathrooms: z.number().positive().optional(),
  sqft: z.number().int().positive().optional(),
  features: z.array(z.string()).optional(),
  isFeatured: z.boolean().default(false),
  images: z.array(z.string()).min(1),
})

type PropertyFormData = z.infer<typeof propertyFormSchema>

export async function createProperty(data: PropertyFormData) {
  try {
    const user = await currentUser()

    if (!user) {
      throw new Error("Not authenticated")
    }

    const dbUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
    })

    if (!dbUser) {
      throw new Error("User not found")
    }

    // Check if user is an agent
    if (dbUser.role !== "AGENT") {
      throw new Error("Only agents can create properties")
    }

    // Create the property
    const property = await prisma.property.create({
      data: {
        title: data.title,
        description: data.description,
        price: data.price,
        address: data.address,
        city: data.city,
        state: data.state,
        country: data.country,
        zip: data.zip,
        type: data.type,
        status: data.status,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        sqft: data.sqft,
        features: data.features || [],
        isFeatured: data.isFeatured,
        images: data.images,
        userId: dbUser.id,
      },
    })

    revalidatePath("/dashboard/agent")
    revalidatePath("/properties")
    revalidatePath("/")

    return { success: true, propertyId: property.id }
  } catch (error) {
    console.error("Error creating property:", error)
    throw new Error("Failed to create property")
  }
}

export async function updateProperty(propertyId: string, data: PropertyFormData) {
  try {
    const user = await currentUser()

    if (!user) {
      throw new Error("Not authenticated")
    }

    const dbUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
    })

    if (!dbUser) {
      throw new Error("User not found")
    }

    // Check if user is an agent
    if (dbUser.role !== "AGENT" && dbUser.role !== "ADMIN") {
      throw new Error("Only agents can update properties")
    }

    // Get the property
    const property = await prisma.property.findUnique({
      where: {
        id: propertyId,
      },
    })

    // Check if property exists and belongs to this agent (unless admin)
    if (!property || (property.userId !== dbUser.id && dbUser.role !== "ADMIN")) {
      throw new Error("Property not found or you don't have permission to update it")
    }

    // Update the property
    await prisma.property.update({
      where: {
        id: propertyId,
      },
      data: {
        title: data.title,
        description: data.description,
        price: data.price,
        address: data.address,
        city: data.city,
        state: data.state,
        country: data.country,
        zip: data.zip,
        type: data.type,
        status: data.status,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        sqft: data.sqft,
        features: data.features || [],
        isFeatured: data.isFeatured,
        images: data.images,
      },
    })

    revalidatePath("/dashboard/agent")
    revalidatePath(`/properties/${propertyId}`)
    revalidatePath("/properties")
    revalidatePath("/")

    return { success: true }
  } catch (error) {
    console.error("Error updating property:", error)
    throw new Error("Failed to update property")
  }
}

export async function deleteProperty(propertyId: string, adminOverride = false) {
  try {
    const user = await currentUser()

    if (!user) {
      throw new Error("Not authenticated")
    }

    const dbUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
    })

    if (!dbUser) {
      throw new Error("User not found")
    }

    // Check if user is an agent or admin
    if (dbUser.role !== "AGENT" && dbUser.role !== "ADMIN") {
      throw new Error("Only agents or admins can delete properties")
    }

    // Get the property
    const property = await prisma.property.findUnique({
      where: {
        id: propertyId,
      },
    })

    // Check if property exists and belongs to this agent (unless admin override)
    if (!property || (property.userId !== dbUser.id && !adminOverride)) {
      throw new Error("Property not found or you don't have permission to delete it")
    }

    // Delete all inquiries for this property
    await prisma.inquiry.deleteMany({
      where: {
        propertyId,
      },
    })

    // Delete all booking requests for this property
    await prisma.bookingRequest.deleteMany({
      where: {
        propertyId,
      },
    })

    // Delete all messages related to this property
    await prisma.message.deleteMany({
      where: {
        propertyId,
      },
    })

    // Delete the property
    await prisma.property.delete({
      where: {
        id: propertyId,
      },
    })

    revalidatePath("/dashboard/agent")
    revalidatePath("/dashboard/admin/properties")
    revalidatePath("/properties")
    revalidatePath("/")

    return { success: true }
  } catch (error) {
    console.error("Error deleting property:", error)
    throw new Error("Failed to delete property")
  }
}

export async function markInquiryAsRead(inquiryId: string, isRead: boolean) {
  try {
    const user = await currentUser()

    if (!user) {
      throw new Error("Not authenticated")
    }

    const dbUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
    })

    if (!dbUser) {
      throw new Error("User not found")
    }

    // Check if user is an agent
    if (dbUser.role !== "AGENT" && dbUser.role !== "ADMIN") {
      throw new Error("Only agents can mark inquiries as read")
    }

    // Get the inquiry
    const inquiry = await prisma.inquiry.findUnique({
      where: {
        id: inquiryId,
      },
      include: {
        property: true,
      },
    })

    // Check if inquiry exists and belongs to a property owned by this agent (unless admin)
    if (!inquiry || (inquiry.property.userId !== dbUser.id && dbUser.role !== "ADMIN")) {
      throw new Error("Inquiry not found or you don't have permission to update it")
    }

    // Update the inquiry
    await prisma.inquiry.update({
      where: {
        id: inquiryId,
      },
      data: {
        isRead,
      },
    })

    revalidatePath("/dashboard/agent/inquiries")
    revalidatePath("/dashboard/admin/inquiries")

    return { success: true }
  } catch (error) {
    console.error("Error marking inquiry as read:", error)
    throw new Error("Failed to mark inquiry as read")
  }
}

export async function updateUserRole(userId: string, role: string) {
  try {
    const user = await currentUser()

    if (!user) {
      throw new Error("Not authenticated")
    }

    const dbUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
    })

    if (!dbUser) {
      throw new Error("User not found")
    }

    // Check if user is an admin
    if (dbUser.role !== "ADMIN") {
      throw new Error("Only admins can update user roles")
    }

    // Update the user role
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role: role as Role,
      },
    })

    revalidatePath("/dashboard/admin/users")

    return { success: true }
  } catch (error) {
    console.error("Error updating user role:", error)
    throw new Error("Failed to update user role")
  }
}

export async function approveProperty(propertyId: string, isApproved: boolean) {
  try {
    const user = await currentUser()

    if (!user) {
      throw new Error("Not authenticated")
    }

    const dbUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
    })

    if (!dbUser) {
      throw new Error("User not found")
    }

    // Check if user is an admin
    if (dbUser.role !== "ADMIN") {
      throw new Error("Only admins can approve properties")
    }

    // Update the property
    await prisma.property.update({
      where: {
        id: propertyId,
      },
      data: {
        isApproved,
      },
    })

    revalidatePath("/dashboard/admin/properties")
    revalidatePath(`/properties/${propertyId}`)
    revalidatePath("/properties")
    revalidatePath("/")

    return { success: true }
  } catch (error) {
    console.error("Error approving property:", error)
    throw new Error("Failed to approve property")
  }
}

export async function createBookingRequest(propertyId: string, message: string) {
  try {
    const user = await currentUser()

    if (!user) {
      throw new Error("Not authenticated")
    }

    const dbUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
    })

    if (!dbUser) {
      throw new Error("User not found")
    }

    // Create the booking request
    const bookingRequest = await prisma.bookingRequest.create({
      data: {
        message,
        userId: dbUser.id,
        propertyId,
      },
    })

    revalidatePath("/dashboard/bookings")
    revalidatePath(`/properties/${propertyId}`)

    return { success: true, bookingRequestId: bookingRequest.id }
  } catch (error) {
    console.error("Error creating booking request:", error)
    throw new Error("Failed to create booking request")
  }
}

export async function updateBookingStatus(bookingId: string, status: BookingStatus) {
  try {
    const user = await currentUser()

    if (!user) {
      throw new Error("Not authenticated")
    }

    const dbUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
    })

    if (!dbUser) {
      throw new Error("User not found")
    }

    // Get the booking request
    const bookingRequest = await prisma.bookingRequest.findUnique({
      where: {
        id: bookingId,
      },
      include: {
        property: true,
      },
    })

    // Check if booking request exists and belongs to a property owned by this agent (unless admin)
    if (!bookingRequest || (bookingRequest.property.userId !== dbUser.id && dbUser.role !== "ADMIN")) {
      throw new Error("Booking request not found or you don't have permission to update it")
    }

    // Update the booking request
    await prisma.bookingRequest.update({
      where: {
        id: bookingId,
      },
      data: {
        status,
      },
    })

    revalidatePath("/dashboard/agent/bookings")
    revalidatePath("/dashboard/bookings")
    revalidatePath(`/properties/${bookingRequest.propertyId}`)

    return { success: true }
  } catch (error) {
    console.error("Error updating booking status:", error)
    throw new Error("Failed to update booking status")
  }
}

export async function sendMessage(data: {
  toUserId: string
  propertyId: string
  content: string
  parentId?: string
}) {
  try {
    const user = await currentUser()

    if (!user) {
      throw new Error("Not authenticated")
    }

    const dbUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
    })

    if (!dbUser) {
      throw new Error("User not found")
    }

    // Create the message
    const message = await prisma.message.create({
      data: {
        content: data.content,
        fromUserId: dbUser.id,
        toUserId: data.toUserId,
        propertyId: data.propertyId,
        parentId: data.parentId,
      },
    })

    revalidatePath("/dashboard/messages")
    revalidatePath(`/dashboard/messages/${data.toUserId}`)

    return { success: true, messageId: message.id }
  } catch (error) {
    console.error("Error sending message:", error)
    throw new Error("Failed to send message")
  }
}

export async function markMessageAsRead(messageId: string) {
  try {
    const user = await currentUser()

    if (!user) {
      throw new Error("Not authenticated")
    }

    const dbUser = await prisma.user.findUnique({
      where: {
        clerkId: user.id,
      },
    })

    if (!dbUser) {
      throw new Error("User not found")
    }

    // Get the message
    const message = await prisma.message.findUnique({
      where: {
        id: messageId,
      },
    })

    // Check if message exists and is addressed to this user
    if (!message || message.toUserId !== dbUser.id) {
      throw new Error("Message not found or you don't have permission to update it")
    }

    // Update the message
    await prisma.message.update({
      where: {
        id: messageId,
      },
      data: {
        isRead: true,
      },
    })

    revalidatePath("/dashboard/messages")
    revalidatePath(`/dashboard/messages/${message.fromUserId}`)

    return { success: true }
  } catch (error) {
    console.error("Error marking message as read:", error)
    throw new Error("Failed to mark message as read")
  }
}

export async function incrementPropertyView(propertyId: string) {
  try {
    // Update the property view count
    await prisma.property.update({
      where: {
        id: propertyId,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    })

    return { success: true }
  } catch (error) {
    console.error("Error incrementing property view:", error)
    // Don't throw an error here, just log it
    return { success: false }
  }
}
