"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const data = [
  {
    name: "Jan",
    users: 12,
    properties: 5,
    bookings: 3,
  },
  {
    name: "Feb",
    users: 18,
    properties: 8,
    bookings: 5,
  },
  {
    name: "Mar",
    users: 25,
    properties: 12,
    bookings: 9,
  },
  {
    name: "Apr",
    users: 30,
    properties: 15,
    bookings: 12,
  },
  {
    name: "May",
    users: 42,
    properties: 20,
    bookings: 15,
  },
  {
    name: "Jun",
    users: 48,
    properties: 25,
    bookings: 18,
  },
]

export function Overview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Platform Growth</CardTitle>
        <CardDescription>Monthly growth of users, properties, and bookings.</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip />
            <Bar dataKey="users" fill="#adfa1d" radius={[4, 4, 0, 0]} />
            <Bar dataKey="properties" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
            <Bar dataKey="bookings" fill="#f43f5e" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
