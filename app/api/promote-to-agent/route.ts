import { currentUser } from "@clerk/nextjs/server"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST() {
  try {
    const user = await currentUser()

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    // Update the user role to AGENT
    await prisma.user.update({
      where: {
        clerkId: user.id,
      },
      data: {
        role: "AGENT",
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error promoting user to agent:", error)
    return NextResponse.json({ error: "Failed to promote user" }, { status: 500 })
  }
}
