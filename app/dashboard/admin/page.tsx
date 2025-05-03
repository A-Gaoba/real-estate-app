import { checkAdminRole } from "@/middleware/admin-auth"
import prisma from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Building, Calendar, Eye } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Overview } from "@/components/dashboard/Overview"
import { RecentProperties } from "@/components/dashboard/RecentProperties"

export default async function AdminDashboard() {
  // This will redirect if the user is not an admin
  await checkAdminRole()

  // Get counts for analytics
  const userCount = await prisma.user.count()
  const propertyCount = await prisma.property.count()
  const bookingCount = await prisma.bookingRequest.count()

  // Calculate total page views
  const totalPageViews = await prisma.property.aggregate({
    _sum: {
      views: true,
    },
  })

  // Get user counts by role
  const usersByRole = await prisma.user.groupBy({
    by: ["role"],
    _count: {
      id: true,
    },
  })

  // Create a map of role to count
  const roleCountMap = new Map()
  usersByRole.forEach((item) => {
    roleCountMap.set(item.role, item._count.id)
  })

  // Get recent properties
  const recentProperties = await prisma.property.findMany({
    take: 5,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      createdBy: {
        select: {
          username: true,
          email: true,
        },
      },
    },
  })

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome to the admin dashboard.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userCount}</div>
            <p className="text-xs text-muted-foreground">
              {roleCountMap.get("USER") || 0} users, {roleCountMap.get("AGENT") || 0} agents,{" "}
              {roleCountMap.get("ADMIN") || 0} admins
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{propertyCount}</div>
            <p className="text-xs text-muted-foreground">Property listings on the platform</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Booking Requests</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bookingCount}</div>
            <p className="text-xs text-muted-foreground">Total booking requests</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPageViews._sum.views || 0}</div>
            <p className="text-xs text-muted-foreground">Total property page views</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="properties">Recent Properties</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Overview />
        </TabsContent>
        <TabsContent value="properties" className="space-y-4">
          <RecentProperties properties={recentProperties} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
