"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { platformStats } from "@/lib/mock-data"
import { TrendingUp, Instagram, Facebook, Twitter, Linkedin, Youtube } from "lucide-react"
import { cn } from "@/lib/utils"

const platformIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Instagram: Instagram,
  Facebook: Facebook,
  Twitter: Twitter,
  LinkedIn: Linkedin,
  YouTube: Youtube,
  TikTok: () => (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  ),
}

export function PlatformStats() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">
          Platform Performance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {platformStats.map((platform) => {
          const Icon = platformIcons[platform.name]
          return (
            <div
              key={platform.name}
              className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 p-3"
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-lg",
                  `bg-${platform.color}/10`
                )} style={{ backgroundColor: `var(--${platform.color})`, opacity: 0.1 }}>
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{platform.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(platform.followers / 1000).toFixed(0)}K followers
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-1 text-primary">
                  <TrendingUp className="h-3 w-3" />
                  <span className="text-sm font-medium">+{platform.growth}%</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {platform.engagement}% engagement
                </p>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
