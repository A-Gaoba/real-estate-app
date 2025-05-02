import { Webhook } from "svix"
import { headers } from "next/headers"
import type { WebhookEvent } from "@clerk/nextjs/server"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  // Get the headers
  const headerPayload = headers()
  const svix_id = headerPayload.get("svix-id")
  const svix_timestamp = headerPayload.get("svix-timestamp")
  const svix_signature = headerPayload.get("svix-signature")

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing svix headers", {
      status: 400,
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET || "")

  let evt: WebhookEvent

  // Verify the webhook
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error("Error verifying webhook:", err)
    return new Response("Error verifying webhook", {
      status: 400,
    })
  }

  // Handle the webhook
  const eventType = evt.type

  if (eventType === "user.created") {
    const { id, email_addresses, username, first_name, last_name } = evt.data

    // Create a new user in the database
    const primaryEmail = email_addresses?.[0]?.email_address

    if (!primaryEmail) {
      return new Response("Error: User has no email address", {
        status: 400,
      })
    }

    try {
      await prisma.user.create({
        data: {
          clerkId: id,
          email: primaryEmail,
          username: username || undefined,
          role: "USER", // Default role
        },
      })

      return new Response("User created", { status: 201 })
    } catch (error) {
      console.error("Error creating user:", error)
      return new Response("Error creating user", { status: 500 })
    }
  }

  if (eventType === "user.updated") {
    const { id, email_addresses, username } = evt.data

    // Update the user in the database
    const primaryEmail = email_addresses?.[0]?.email_address

    if (!primaryEmail) {
      return new Response("Error: User has no email address", {
        status: 400,
      })
    }

    try {
      await prisma.user.update({
        where: { clerkId: id },
        data: {
          email: primaryEmail,
          username: username || undefined,
        },
      })

      return new Response("User updated", { status: 200 })
    } catch (error) {
      console.error("Error updating user:", error)
      return new Response("Error updating user", { status: 500 })
    }
  }

  if (eventType === "user.deleted") {
    const { id } = evt.data

    try {
      // Find the user first
      const user = await prisma.user.findUnique({
        where: { clerkId: id },
      })

      if (!user) {
        return new Response("User not found", { status: 404 })
      }

      // Delete the user from the database
      await prisma.user.delete({
        where: { clerkId: id },
      })

      return new Response("User deleted", { status: 200 })
    } catch (error) {
      console.error("Error deleting user:", error)
      return new Response("Error deleting user", { status: 500 })
    }
  }

  // Return a 200 response for any other event types
  return new Response("Webhook received", { status: 200 })
}
