"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, User } from "lucide-react"
import { createInquiry } from "@/lib/actions"
import { toast } from "@/components/ui/use-toast"
import { useUser } from "@clerk/nextjs"

interface PropertyContactFormProps {
  propertyId: string
  propertyTitle: string
  agentName?: string
  agentEmail?: string
}

export function PropertyContactForm({ propertyId, propertyTitle, agentName, agentEmail }: PropertyContactFormProps) {
  const { user, isSignedIn } = useUser()

  const [formState, setFormState] = useState({
    name: user?.fullName || "",
    email: user?.primaryEmailAddress?.emailAddress || "",
    phone: "",
    message: `Hi, I'm interested in the property "${propertyTitle}". Please contact me with more information.`,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isSignedIn) {
      toast({
        title: "Sign in required",
        description: "You need to sign in to send an inquiry.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      await createInquiry({
        propertyId,
        name: formState.name,
        email: formState.email,
        phone: formState.phone,
        message: formState.message,
      })

      setIsSubmitted(true)
      toast({
        title: "Inquiry sent",
        description: "Your inquiry has been sent successfully.",
      })
    } catch (error) {
      console.error("Error sending inquiry:", error)
      toast({
        title: "Error",
        description: "There was an error sending your inquiry. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact {agentName || "Agent"}</CardTitle>
        <CardDescription>
          Interested in this property? Send a message to {agentName || "the agent"} to schedule a viewing or ask
          questions.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isSubmitted ? (
          <div className="flex flex-col items-center justify-center space-y-4 py-6">
            <div className="rounded-full bg-primary/10 p-3">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Message Sent!</h3>
            <p className="text-center text-muted-foreground">
              Thank you for your inquiry. {agentName || "The agent"} will get back to you soon.
            </p>
            <Button onClick={() => setIsSubmitted(false)}>Send Another Message</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formState.phone}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder="(123) 456-7890"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                value={formState.message}
                onChange={handleChange}
                className="min-h-[120px]"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
            {!isSignedIn && (
              <p className="text-xs text-muted-foreground text-center mt-2">
                You need to be signed in to send an inquiry.
              </p>
            )}
          </form>
        )}
      </CardContent>
    </Card>
  )
}
