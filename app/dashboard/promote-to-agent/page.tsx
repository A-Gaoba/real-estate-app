"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

export default function PromoteToAgent() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handlePromote = async () => {
    try {
      setIsLoading(true)

      // This is a simple endpoint to promote the current user to agent role
      const response = await fetch("/api/promote-to-agent", {
        method: "POST",
      })

      if (!response.ok) {
        throw new Error("Failed to promote user")
      }

      toast({
        title: "Promoted to Agent",
        description: "You have been promoted to an agent. You can now create and manage properties.",
      })

      router.push("/dashboard/agent")
      router.refresh()
    } catch (error) {
      console.error("Error promoting user:", error)
      toast({
        title: "Error",
        description: "There was an error promoting you to agent. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Become an Agent</CardTitle>
          <CardDescription>Promote your account to agent status to list and manage properties.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">As an agent, you'll be able to:</p>
          <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
            <li>Create property listings</li>
            <li>Manage your properties</li>
            <li>Receive and respond to inquiries</li>
            <li>Track property performance</li>
          </ul>
        </CardContent>
        <CardFooter>
          <Button onClick={handlePromote} disabled={isLoading} className="w-full">
            {isLoading ? "Processing..." : "Promote to Agent"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
