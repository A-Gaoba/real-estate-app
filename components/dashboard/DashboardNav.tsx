"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Heart, MessageSquare, User, Home, Settings, Building } from "lucide-react"
import type { User as UserType } from "@prisma/client"

interface DashboardNavProps {
  user: UserType
}

export function DashboardNav({ user }: DashboardNavProps) {
  const pathname = usePathname()

  const routes = [
    {
      href: "/dashboard",
      label: "Overview",
      icon: Home,
    },
    {
      href: "/dashboard/saved",
      label: "Saved Properties",
      icon: Heart,
    },
    {
      href: "/dashboard/inquiries",
      label: "My Inquiries",
      icon: MessageSquare,
    },
    ...(user.role === "AGENT"
      ? [
          {
            href: "/dashboard/agent",
            label: "Agent Dashboard",
            icon: Building,
          },
        ]
      : []),
    {
      href: "/dashboard/profile",
      label: "Profile",
      icon: User,
    },
    {
      href: "/dashboard/settings",
      label: "Settings",
      icon: Settings,
    },
  ]

  return (
    <ScrollArea className="h-full py-6">
      <div className="flex flex-col gap-4 px-3 py-2">
        <div className="flex flex-col gap-1">
          <h2 className="px-4 text-lg font-semibold tracking-tight">Dashboard</h2>
          <p className="px-4 text-sm text-muted-foreground">Welcome, {user.username || "User"}</p>
        </div>
        <div className="flex flex-col gap-1">
          {routes.map((route) => (
            <Button
              key={route.href}
              variant={pathname === route.href ? "secondary" : "ghost"}
              className={cn("justify-start gap-2", pathname === route.href && "bg-secondary")}
              asChild
            >
              <Link href={route.href}>
                <route.icon className="h-4 w-4" />
                {route.label}
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </ScrollArea>
  )
}
