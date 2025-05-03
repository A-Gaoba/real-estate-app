import type React from "react"
import { checkAgentRole } from "@/middleware/agent-auth"
import { AgentNav } from "@/components/dashboard/AgentNav"

export default async function AgentDashboardLayout({ children }: { children: React.ReactNode }) {
  // This will redirect if the user is not an agent
  const agent = await checkAgentRole()

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <AgentNav agent={agent} />
        </aside>
        <main className="flex w-full flex-col overflow-hidden">{children}</main>
      </div>
    </div>
  )
}
