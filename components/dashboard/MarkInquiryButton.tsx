"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { markInquiryAsRead } from "@/lib/actions"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

interface MarkInquiryButtonProps {
  inquiryId: string
  isRead: boolean
}

export function MarkInquiryButton({ inquiryId, isRead }: MarkInquiryButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleClick = async () => {
    try {
      setIsLoading(true)
      await markInquiryAsRead(inquiryId, !isRead)
      toast({
        title: `Inquiry marked as ${!isRead ? "read" : "unread"}`,
        description: `The inquiry has been marked as ${!isRead ? "read" : "unread"}.`,
      })
      router.refresh()
    } catch (error) {
      console.error("Error marking inquiry:", error)
      toast({
        title: "Error",
        description: "There was an error updating the inquiry. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button variant="outline" onClick={handleClick} disabled={isLoading}>
      {isLoading ? "Updating..." : `Mark as ${isRead ? "Unread" : "Read"}`}
    </Button>
  )
}
