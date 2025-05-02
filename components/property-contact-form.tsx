"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useUser } from "@clerk/nextjs"

interface PropertyContactFormProps {
  propertyId: string
  agentId: string
}

export default function PropertyContactForm({ propertyId, agentId }: PropertyContactFormProps) {
  const { isSignedIn, user } = useUser()
  const { toast } = useToast()
  const [message, setMessage] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!message) {
      toast({
        title: "Message required",
        description: "Please enter a message for the agent",
        variant: "destructive",
      })
      return
    }

    if (!isSignedIn && (!name || !email)) {
      toast({
        title: "Information required",
        description: "Please provide your name and email",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      // In a real app, this would call a server action to send the message
      // await createBookingRequest(propertyId, message)

      // For demo purposes, we'll just simulate a delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Message sent",
        description: "Your message has been sent to the agent",
      })

      setMessage("")
      if (!isSignedIn) {
        setName("")
        setEmail("")
        setPhone("")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-muted p-6 rounded-lg">
      <h3 className="font-semibold text-lg mb-4">Contact Agent</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isSignedIn && (
          <>
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone (optional)</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Your phone number"
              />
            </div>
          </>
        )}

        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="I'm interested in this property and would like to schedule a viewing..."
            className="min-h-[120px]"
            required
          />
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          By submitting this form, you agree to our privacy policy and terms of service.
        </p>
      </form>
    </div>
  )
}
