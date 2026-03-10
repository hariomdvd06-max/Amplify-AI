"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { campaigns } from "@/lib/mock-data"
import { ArrowRight, Instagram, Facebook, Twitter, Linkedin, Youtube } from "lucide-react"
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
}

const statusStyles: Record<string, string> = {
  active: "bg-primary/10 text-primary border-primary/20",
  paused: "bg-warning/10 text-warning border-warning/20",
  draft: "bg-muted text-muted-foreground border-border",
  completed: "bg-secondary text-secondary-foreground border-border",
}

export function CampaignList() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold text-foreground">
          Active Campaigns
        </CardTitle>
        <Button variant="ghost" size="sm" className="gap-1 text-primary">
          View All <ArrowRight className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {campaigns.slice(0, 4).map((campaign) => {
          const budgetProgress = (campaign.spent / campaign.budget) * 100
          
          return (
            <div
              key={campaign.id}
              className="rounded-lg border border-border bg-secondary/30 p-4 transition-colors hover:bg-secondary/50"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-foreground">{campaign.name}</h3>
                    <Badge
                      variant="outline"
                      className={cn("capitalize", statusStyles[campaign.status])}
                    >
                      {campaign.status}
                    </Badge>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    {campaign.platforms.map((platform) => {
                      const Icon = platformIcons[platform.name]
                      return (
                        <div
                          key={platform.name}
                          className="flex h-6 w-6 items-center justify-center rounded bg-secondary"
                        >
                          <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                        </div>
                      )
                    })}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">
                    {campaign.performance.roi}% ROI
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(campaign.performance.impressions / 1000000).toFixed(1)}M impressions
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Budget: ${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}</span>
                  <span>{budgetProgress.toFixed(0)}%</span>
                </div>
                <Progress value={budgetProgress} className="mt-1 h-1.5" />
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}
