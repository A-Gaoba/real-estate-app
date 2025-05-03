"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast"
import { approveProperty, deleteProperty } from "@/lib/actions"
import { useRouter } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { Property } from "@prisma/client"

interface PropertyApprovalActionsProps {
  property: Property & {
    createdBy: {
      username: string | null
      email: string
    }
  }
}

export function PropertyApprovalActions({ property }: PropertyApprovalActionsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const router = useRouter()

  const handleApprovalChange = async (approved: boolean) => {
    try {
      setIsLoading(true)
      await approveProperty(property.id, approved)
      toast({
        title: approved ? "Property approved" : "Property unapproved",
        description: `The property has been ${approved ? "approved" : "unapproved"}.`,
      })
      router.refresh()
    } catch (error) {
      console.error("Error updating property approval:", error)
      toast({
        title: "Error",
        description: "There was an error updating the property approval status. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    try {
      setIsLoading(true)
      await deleteProperty(property.id, true) // true for admin override
      toast({
        title: "Property deleted",
        description: "The property has been deleted successfully.",
      })
      router.refresh()
    } catch (error) {
      console.error("Error deleting property:", error)
      toast({
        title: "Error",
        description: "There was an error deleting the property. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setIsDeleteDialogOpen(false)
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" disabled={isLoading}>
            {isLoading ? "Processing..." : "Actions"}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Manage property</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => handleApprovalChange(true)}
            disabled={property.isApproved}
            className="text-green-600"
          >
            Approve
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleApprovalChange(false)}
            disabled={!property.isApproved}
            className="text-amber-600"
          >
            Unapprove
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)} className="text-red-600">
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the property and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isLoading} className="bg-red-600 hover:bg-red-700">
              {isLoading ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
