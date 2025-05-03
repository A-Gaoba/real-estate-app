import {
  PrismaClient,
  PropertyType,
  PropertyStatus,
  Role,
} from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    // Create a test user (agent)
    const agent = await prisma.user.upsert({
      where: { email: "agent@example.com" },
      update: {},
      create: {
        clerkId: "test_agent_clerk_id",
        email: "agent@example.com",
        username: "testagent",
        role: Role.AGENT,
      },
    });

    console.log(`Created agent: ${agent.email}`);

    // Create properties
    const propertyData = [
      {
        title: "Modern Apartment in Downtown",
        description:
          "A beautiful modern apartment in the heart of downtown. Features include hardwood floors, stainless steel appliances, and a balcony with city views.",
        price: 250000,
        address: "123 Main St",
        city: "New York",
        state: "NY",
        country: "USA",
        zip: "10001",
        images: [
          "/placeholder.svg?height=500&width=800",
          "/placeholder.svg?height=500&width=800",
          "/placeholder.svg?height=500&width=800",
        ],
        features: [
          "Central Air",
          "Dishwasher",
          "Hardwood Floors",
          "Stainless Steel Appliances",
          "Walk-in Closet",
        ],
        type: PropertyType.APARTMENT,
        status: PropertyStatus.AVAILABLE,
        isFeatured: true,
        userId: agent.id,
      },
      {
        title: "Suburban Family Home",
        description:
          "Spacious family home in a quiet suburban neighborhood. Features a large backyard, updated kitchen, and a two-car garage.",
        price: 450000,
        address: "456 Oak Ave",
        city: "Los Angeles",
        state: "CA",
        country: "USA",
        zip: "90001",
        images: [
          "/placeholder.svg?height=500&width=800",
          "/placeholder.svg?height=500&width=800",
          "/placeholder.svg?height=500&width=800",
        ],
        features: [
          "Backyard",
          "Garage",
          "Updated Kitchen",
          "Fireplace",
          "Basement",
        ],
        type: PropertyType.HOUSE,
        status: PropertyStatus.AVAILABLE,
        isFeatured: true,
        userId: agent.id,
      },
      {
        title: "Luxury Penthouse with View",
        description:
          "Stunning penthouse with panoramic city views. Features include high ceilings, floor-to-ceiling windows, a gourmet kitchen, and a private rooftop terrace.",
        price: 1200000,
        address: "789 Skyline Blvd",
        city: "San Francisco",
        state: "CA",
        country: "USA",
        zip: "94111",
        images: [
          "/placeholder.svg?height=500&width=800",
          "/placeholder.svg?height=500&width=800",
          "/placeholder.svg?height=500&width=800",
        ],
        features: [
          "Rooftop Terrace",
          "Floor-to-ceiling Windows",
          "Gourmet Kitchen",
          "High Ceilings",
          "City Views",
        ],
        type: PropertyType.CONDO,
        status: PropertyStatus.AVAILABLE,
        isFeatured: true,
        userId: agent.id,
      },
      {
        title: "Cozy Studio Apartment",
        description:
          "Cozy studio apartment perfect for students or young professionals. Recently renovated with modern finishes and efficient use of space.",
        price: 150000,
        address: "101 College St",
        city: "Boston",
        state: "MA",
        country: "USA",
        zip: "02115",
        images: [
          "/placeholder.svg?height=500&width=800",
          "/placeholder.svg?height=500&width=800",
          "/placeholder.svg?height=500&width=800",
        ],
        features: [
          "Recently Renovated",
          "Modern Finishes",
          "Efficient Layout",
          "Close to Campus",
          "Public Transit",
        ],
        type: PropertyType.APARTMENT,
        status: PropertyStatus.AVAILABLE,
        isFeatured: false,
        userId: agent.id,
      },
      {
        title: "Waterfront Condo",
        description:
          "Beautiful waterfront condo with stunning views. Features include an open floor plan, updated kitchen, and access to community amenities.",
        price: 550000,
        address: "222 Harbor Dr",
        city: "Miami",
        state: "FL",
        country: "USA",
        zip: "33101",
        images: [
          "/placeholder.svg?height=500&width=800",
          "/placeholder.svg?height=500&width=800",
          "/placeholder.svg?height=500&width=800",
        ],
        features: [
          "Waterfront",
          "Open Floor Plan",
          "Updated Kitchen",
          "Community Pool",
          "Fitness Center",
        ],
        type: PropertyType.CONDO,
        status: PropertyStatus.AVAILABLE,
        isFeatured: true,
        userId: agent.id,
      },
      {
        title: "Historic Townhouse",
        description:
          "Charming historic townhouse with original details and modern updates. Features include high ceilings, hardwood floors, and a private courtyard.",
        price: 650000,
        address: "333 Heritage Ln",
        city: "Charleston",
        state: "SC",
        country: "USA",
        zip: "29401",
        images: [
          "/placeholder.svg?height=500&width=800",
          "/placeholder.svg?height=500&width=800",
          "/placeholder.svg?height=500&width=800",
        ],
        features: [
          "Historic Details",
          "High Ceilings",
          "Hardwood Floors",
          "Private Courtyard",
          "Modern Updates",
        ],
        type: PropertyType.TOWNHOUSE,
        status: PropertyStatus.AVAILABLE,
        isFeatured: true,
        userId: agent.id,
      },
    ];

    for (const property of propertyData) {
      await prisma.property.upsert({
        where: {
          id: property.title.toLowerCase().replace(/\s+/g, "-"),
        },
        update: property,
        create: {
          ...property,
        },
      });
    }

    console.log(`Seeded ${propertyData.length} properties`);
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
