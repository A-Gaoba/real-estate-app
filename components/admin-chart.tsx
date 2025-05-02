"use client"

import { useState, useEffect } from "react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Skeleton } from "@/components/ui/skeleton"

// Generate mock data for the charts
const generateViewsData = () => {
  return Array.from({ length: 30 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (29 - i))

    return {
      date: date.toISOString().split("T")[0],
      views: Math.floor(Math.random() * 500) + 100,
    }
  })
}

const generateListingsData = () => {
  return Array.from({ length: 30 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (29 - i))

    return {
      date: date.toISOString().split("T")[0],
      listings: Math.floor(Math.random() * 10) + 1,
    }
  })
}

interface AdminChartProps {
  type: "views" | "listings"
}

export default function AdminChart({ type }: AdminChartProps) {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data from API
    const timer = setTimeout(() => {
      if (type === "views") {
        setData(generateViewsData())
      } else {
        setData(generateListingsData())
      }
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [type])

  if (loading) {
    return <Skeleton className="h-[300px] w-full" />
  }

  return (
    <ChartContainer
      config={{
        [type === "views" ? "views" : "listings"]: {
          label: type === "views" ? "Views" : "Listings",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(value) => {
              const date = new Date(value)
              return `${date.getDate()}/${date.getMonth() + 1}`
            }}
          />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Line
            type="monotone"
            dataKey={type === "views" ? "views" : "listings"}
            stroke="var(--color-views)"
            name={type === "views" ? "Views" : "Listings"}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
