import type React from "react"
import { checkAdminRole } from "@/middleware/admin-auth"
import { AdminNav } from "@/components/dashboard/AdminNav"

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  // This will redirect if the user is not an admin
  const admin = await checkAdminRole()

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block">
          <AdminNav admin={admin} />
        </aside>
        <main className="flex w-full flex-col overflow-hidden">{children}</main>
      </div>
    </div>
  )
}
