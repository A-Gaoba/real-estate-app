import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import DashboardStats from "@/components/dashboard-stats"
import SavedProperties from "@/components/saved-properties"
import UserProperties from "@/components/user-properties"
import UserMessages from "@/components/user-messages"

export default function DashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button asChild>
          <Link href="/dashboard/properties/new">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M5 12h14" />
              <path d="M12 5v14" />
            </svg>
            Add New Property
          </Link>
        </Button>
      </div>

      <DashboardStats />

      <Tabs defaultValue="saved" className="mt-8">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="saved">Saved Properties</TabsTrigger>
          <TabsTrigger value="listings">My Listings</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>
        <TabsContent value="saved" className="mt-6">
          <SavedProperties />
        </TabsContent>
        <TabsContent value="listings" className="mt-6">
          <UserProperties />
        </TabsContent>
        <TabsContent value="messages" className="mt-6">
          <UserMessages />
        </TabsContent>
      </Tabs>
    </div>
  )
}
