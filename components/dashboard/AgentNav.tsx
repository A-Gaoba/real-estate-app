"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Building, Plus, MessageSquare, User, Settings } from "lucide-react"
import type { User as UserType } from "@prisma/client"

interface AgentNavProps {
  agent: UserType
}

export function AgentNav({ agent }: AgentNavProps) {
  const pathname = usePathname()

  const routes = [
    {
      href: "/dashboard/agent",
      label: "My Properties",
      icon: Building,
    },
    {
      href: "/dashboard/agent/add",
      label: "Add Property",
      icon: Plus,
    },
    {
      href: "/dashboard/agent/inquiries",
      label: "Inquiries",
      icon: MessageSquare,
    },
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
          <h2 className="px-4 text-lg font-semibold tracking-tight">Agent Dashboard</h2>
          <p className="px-4 text-sm text-muted-foreground">Welcome, {agent.username || "Agent"}</p>
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
