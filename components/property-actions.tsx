"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useUser } from "@clerk/nextjs"
import { Heart, Share2 } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface PropertyActionsProps {
  propertyId: string
}

export default function PropertyActions({ propertyId }: PropertyActionsProps) {
  const { isSignedIn, user } = useUser()
  const { toast } = useToast()
  const [isSaved, setIsSaved] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSaveProperty = async () => {
    if (!isSignedIn) {
      toast({
        title: "Authentication required",
        description: "Please sign in to save properties",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      // In a real app, this would call a server action to toggle saved status
      // await toggleSaveProperty(propertyId)

      // For demo purposes, we'll just update the local state
      setIsSaved(!isSaved)

      toast({
        title: isSaved ? "Property removed from saved list" : "Property saved successfully",
        description: "You can view your saved properties in your dashboard",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save property. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleShare = async (platform: string) => {
    const url = window.location.href

    switch (platform) {
      case "copy":
        await navigator.clipboard.writeText(url)
        toast({
          title: "Link copied",
          description: "Property link copied to clipboard",
        })
        break
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank")
        break
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?url=${url}`, "_blank")
        break
      case "whatsapp":
        window.open(`https://api.whatsapp.com/send?text=${url}`, "_blank")
        break
      case "email":
        window.open(`mailto:?subject=Check out this property&body=${url}`, "_blank")
        break
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="icon" onClick={handleSaveProperty} disabled={loading}>
        <Heart className={`h-5 w-5 ${isSaved ? "fill-red-500 text-red-500" : ""}`} />
        <span className="sr-only">Save property</span>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <Share2 className="h-5 w-5" />
            <span className="sr-only">Share property</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleShare("copy")}>Copy Link</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare("facebook")}>Share on Facebook</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare("twitter")}>Share on Twitter</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare("whatsapp")}>Share on WhatsApp</DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare("email")}>Share via Email</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
