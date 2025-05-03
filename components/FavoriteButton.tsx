"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { saveProperty } from "@/lib/actions"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

interface FavoriteButtonProps {
  propertyId: string
  isSaved?: boolean
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export function FavoriteButton({
  propertyId,
  isSaved = false,
  variant = "outline",
  size = "icon",
  className,
}: FavoriteButtonProps) {
  const [saved, setSaved] = useState(isSaved)
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    try {
      setIsLoading(true)
      const result = await saveProperty(propertyId)
      setSaved(result.saved)

      toast({
        title: result.saved ? "Property saved" : "Property removed",
        description: result.saved
          ? "This property has been added to your saved properties."
          : "This property has been removed from your saved properties.",
      })
    } catch (error) {
      console.error("Error saving property:", error)
      toast({
        title: "Error",
        description: "There was an error saving this property. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleSave}
      disabled={isLoading}
      className={cn(className)}
      aria-label={saved ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart className={cn("h-4 w-4", saved ? "fill-primary text-primary" : "fill-none")} />
    </Button>
  )
}
