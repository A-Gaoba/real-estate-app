import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AdminStats from "@/components/admin-stats"
import AdminUsersList from "@/components/admin-users-list"
import AdminPropertiesList from "@/components/admin-properties-list"
import AdminChart from "@/components/admin-chart"

export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <AdminStats />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Property Views</CardTitle>
            <CardDescription>Daily property views over the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <AdminChart type="views" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>New Listings</CardTitle>
            <CardDescription>New properties listed over the last 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <AdminChart type="listings" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="mt-8">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="properties">Properties</TabsTrigger>
        </TabsList>
        <TabsContent value="users" className="mt-6">
          <AdminUsersList />
        </TabsContent>
        <TabsContent value="properties" className="mt-6">
          <AdminPropertiesList />
        </TabsContent>
      </Tabs>
    </div>
  )
}
