"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { recentActivity } from "@/lib/mock-data"
import { CheckCircle2, AlertCircle, Info, Instagram, Facebook, Twitter, Linkedin, Youtube, Globe } from "lucide-react"
import { cn } from "@/lib/utils"

const platformIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
  linkedin: Linkedin,
  youtube: Youtube,
  tiktok: () => (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  ),
  all: Globe,
}

const statusStyles: Record<string, { icon: React.ComponentType<{ className?: string }>; class: string }> = {
  success: { icon: CheckCircle2, class: "text-primary" },
  warning: { icon: AlertCircle, class: "text-warning" },
  info: { icon: Info, class: "text-info" },
}

export function RecentActivity() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivity.map((activity) => {
            const StatusIcon = statusStyles[activity.status].icon
            const PlatformIcon = platformIcons[activity.platform]
            
            return (
              <div
                key={activity.id}
                className="flex items-start gap-3 rounded-lg border border-border bg-secondary/30 p-3"
              >
                <div className={cn("mt-0.5", statusStyles[activity.status].class)}>
                  <StatusIcon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {activity.action}
                  </p>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="flex h-5 w-5 items-center justify-center rounded bg-secondary">
                      <PlatformIcon className="h-3 w-3 text-muted-foreground" />
                    </div>
                    <span className="text-xs text-muted-foreground capitalize">
                      {activity.platform}
                    </span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
