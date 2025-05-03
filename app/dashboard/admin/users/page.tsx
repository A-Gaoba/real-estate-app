import { checkAdminRole } from "@/middleware/admin-auth"
import prisma from "@/lib/prisma"
import { formatDistanceToNow } from "date-fns"
import { UserRoleActions } from "@/components/dashboard/UserRoleActions"
import { Badge } from "@/components/ui/badge"

export default async function AdminUsers() {
  // This will redirect if the user is not an admin
  await checkAdminRole()

  // Get all users
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })

  // Get role badge variant
  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "USER":
        return "secondary"
      case "AGENT":
        return "default"
      case "ADMIN":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Users</h1>
        <p className="text-muted-foreground">Manage user accounts and roles.</p>
      </div>

      <div className="rounded-md border">
        <div className="overflow-hidden">
          <table className="w-full caption-bottom text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="h-12 px-4 text-left align-middle font-medium">User</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Role</th>
                <th className="h-12 px-4 text-left align-middle font-medium">Joined</th>
                <th className="h-12 px-4 text-right align-middle font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle">
                    <div>
                      <div className="font-medium">{user.username || "No username"}</div>
                      <div className="text-xs text-muted-foreground">{user.email}</div>
                    </div>
                  </td>
                  <td className="p-4 align-middle">
                    <Badge variant={getRoleBadgeVariant(user.role)}>{user.role}</Badge>
                  </td>
                  <td className="p-4 align-middle">
                    {formatDistanceToNow(new Date(user.createdAt), { addSuffix: true })}
                  </td>
                  <td className="p-4 align-middle text-right">
                    <UserRoleActions user={user} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
