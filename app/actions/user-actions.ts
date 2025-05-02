"use server"

import { revalidatePath } from "next/cache"
import { auth, clerkClient } from "@clerk/nextjs/server"
import prisma from "@/lib/prisma"

// Get current user from database
export async function getCurrentDbUser() {
  const { userId } = auth()

  if (!userId) {
    return null
  }

  const dbUser = await prisma.user.findUnique({
    where: { clerkId: userId },
  })

  return dbUser
}

// Update user role
export async function updateUserRole(userId: string, role: "USER" | "AGENT" | "ADMIN") {
  const { userId: currentUserId } = auth()

  if (!currentUserId) {
    throw new Error("Unauthorized")
  }

  // Check if current user is an admin
  const currentUser = await prisma.user.findUnique({
    where: { clerkId: currentUserId },
  })

  if (!currentUser || currentUser.role !== "ADMIN") {
    throw new Error("Unauthorized: Only admins can update user roles")
  }

  // Get the user to update
  const userToUpdate = await prisma.user.findUnique({
    where: { id: userId },
  })

  if (!userToUpdate) {
    throw new Error("User not found")
  }

  // Update the user role in the database
  await prisma.user.update({
    where: { id: userId },
    data: { role },
  })

  // Update the user role in Clerk
  await clerkClient.users.updateUserMetadata(userToUpdate.clerkId, {
    publicMetadata: {
      role,
    },
  })

  revalidatePath("/admin/users")
  revalidatePath("/admin")

  return { success: true }
}

// Delete user
export async function deleteUser(userId: string) {
  const { userId: currentUserId } = auth()

  if (!currentUserId) {
    throw new Error("Unauthorized")
  }

  // Check if current user is an admin
  const currentUser = await prisma.user.findUnique({
    where: { clerkId: currentUserId },
  })

  if (!currentUser || currentUser.role !== "ADMIN") {
    throw new Error("Unauthorized: Only admins can delete users")
  }

  // Get the user to delete
  const userToDelete = await prisma.user.findUnique({
    where: { id: userId },
  })

  if (!userToDelete) {
    throw new Error("User not found")
  }

  // Delete the user from the database
  await prisma.user.delete({
    where: { id: userId },
  })

  // Delete the user from Clerk
  await clerkClient.users.deleteUser(userToDelete.clerkId)

  revalidatePath("/admin/users")
  revalidatePath("/admin")

  return { success: true }
}

// Get user statistics
export async function getUserStats() {
  const { userId } = auth()

  if (!userId) {
    throw new Error("Unauthorized")
  }

  // Check if user exists
  const user = await prisma.user.findUnique({
    where: { clerkId: userId },
  })

  if (!user) {
    throw new Error("User not found")
  }

  // Get user statistics
  const savedPropertiesCount = await prisma.property.count({
    where: {
      savedByIds: {
        has: user.id,
      },
    },
  })

  const listedPropertiesCount = await prisma.property.count({
    where: {
      createdById: user.id,
    },
  })

  const propertyViews = await prisma.property.aggregate({
    where: {
      createdById: user.id,
    },
    _sum: {
      views: true,
    },
  })

  const unreadMessagesCount = await prisma.message.count({
    where: {
      toId: user.id,
      read: false,
    },
  })

  return {
    savedProperties: savedPropertiesCount,
    listedProperties: listedPropertiesCount,
    propertyViews: propertyViews._sum.views || 0,
    unreadMessages: unreadMessagesCount,
  }
}
