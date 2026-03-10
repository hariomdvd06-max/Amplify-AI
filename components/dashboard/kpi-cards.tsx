"use client"

import { ArrowUpRight, ArrowDownRight, Users, Eye, MousePointerClick, Target, TrendingUp, DollarSign } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const kpis = [
  {
    title: "Total Reach",
    value: "2.8M",
    change: 12.5,
    trend: "up" as const,
    icon: Eye,
    description: "vs last month",
  },
  {
    title: "Engagement Rate",
    value: "4.8%",
    change: 0.8,
    trend: "up" as const,
    icon: TrendingUp,
    description: "across all platforms",
  },
  {
    title: "Click-Through Rate",
    value: "2.1%",
    change: -0.3,
    trend: "down" as const,
    icon: MousePointerClick,
    description: "vs last week",
  },
  {
    title: "Conversions",
    value: "12,450",
    change: 24.2,
    trend: "up" as const,
    icon: Target,
    description: "this month",
  },
  {
    title: "New Followers",
    value: "+15.2K",
    change: 18.3,
    trend: "up" as const,
    icon: Users,
    description: "across platforms",
  },
  {
    title: "ROI",
    value: "285%",
    change: 32.1,
    trend: "up" as const,
    icon: DollarSign,
    description: "return on ad spend",
  },
]

export function KPICards() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {kpis.map((kpi) => (
        <Card key={kpi.title} className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <kpi.icon className="h-5 w-5 text-primary" />
              </div>
              <div
                className={cn(
                  "flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
                  kpi.trend === "up"
                    ? "bg-primary/10 text-primary"
                    : "bg-destructive/10 text-destructive"
                )}
              >
                {kpi.trend === "up" ? (
                  <ArrowUpRight className="h-3 w-3" />
                ) : (
                  <ArrowDownRight className="h-3 w-3" />
                )}
                {Math.abs(kpi.change)}%
              </div>
            </div>
            <div className="mt-3">
              <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
              <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{kpi.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
