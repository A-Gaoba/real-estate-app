import prisma from "@/lib/prisma"
import type { PropertyType, PropertyStatus } from "@prisma/client"

export async function getFeaturedProperties(limit = 6) {
  try {
    const properties = await prisma.property.findMany({
      where: {
        isFeatured: true,
      },
      include: {
        createdBy: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    })
    return properties
  } catch (error) {
    console.error("Error fetching featured properties:", error)
    return []
  }
}

export async function getAllProperties(limit = 20) {
  try {
    const properties = await prisma.property.findMany({
      include: {
        createdBy: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    })
    return properties
  } catch (error) {
    console.error("Error fetching all properties:", error)
    return []
  }
}

export async function getPropertyById(id: string) {
  try {
    const property = await prisma.property.findUnique({
      where: {
        id,
      },
      include: {
        createdBy: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
    })
    return property
  } catch (error) {
    console.error(`Error fetching property with id ${id}:`, error)
    return null
  }
}

export async function getPropertiesByType(type: PropertyType, limit = 20) {
  try {
    const properties = await prisma.property.findMany({
      where: {
        type,
      },
      include: {
        createdBy: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    })
    return properties
  } catch (error) {
    console.error(`Error fetching properties of type ${type}:`, error)
    return []
  }
}

export async function getPropertiesByStatus(status: PropertyStatus, limit = 20) {
  try {
    const properties = await prisma.property.findMany({
      where: {
        status,
      },
      include: {
        createdBy: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
      },
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    })
    return properties
  } catch (error) {
    console.error(`Error fetching properties with status ${status}:`, error)
    return []
  }
}
