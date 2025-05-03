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
import { updateUserRole } from "@/lib/actions"
import { useRouter } from "next/navigation"
import type { User } from "@prisma/client"

interface UserRoleActionsProps {
  user: User
}

export function UserRoleActions({ user }: UserRoleActionsProps) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleRoleChange = async (newRole: string) => {
    try {
      setIsLoading(true)
      await updateUserRole(user.id, newRole)
      toast({
        title: "Role updated",
        description: `User role has been updated to ${newRole}.`,
      })
      router.refresh()
    } catch (error) {
      console.error("Error updating user role:", error)
      toast({
        title: "Error",
        description: "There was an error updating the user role. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={isLoading}>
          {isLoading ? "Updating..." : "Change Role"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Change user role</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleRoleChange("USER")} disabled={user.role === "USER"}>
          User
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleRoleChange("AGENT")} disabled={user.role === "AGENT"}>
          Agent
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleRoleChange("ADMIN")} disabled={user.role === "ADMIN"}>
          Admin
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
